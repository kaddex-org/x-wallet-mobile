import {put, select, takeEvery} from 'redux-saga/effects';
import queryString from 'query-string';
import {AxiosError, AxiosResponse} from 'axios';

import {TAction} from '../types';
import {
  swapRequestError,
  swapRequestFulfilled,
  swapRequestPending,
} from './index';
import {
  TFinishTransferRequest,
  TGetTransferParams,
  TMakeTransferRequest,
  TSwapRequest,
} from './types';
import {
  FINISH_TRANSFER_REQUEST,
  MAKE_TRANSFER_REQUEST,
  SWAP_REQUEST,
} from './actions';
import {setTransferResult} from './index';
import {wait} from '../../utils/hooksHelpers';
import {
  getContinuationTransferRequest,
  getCrossTransferRequest,
  getSendRequest,
  getSimpleTransferRequest,
  getSpvRequest,
  getPollRequest as getPollRequestAPI,
  swapApiRequest,
} from './services';
import {getNetworkParams} from '../../utils/networkHelpers';
import {replaceSendResult, setListenResult, setSendResult} from '../history';
import {getBalances} from '../userWallet/actions';
import {makeSelectActiveNetworkDetails} from '../networks/selectors';
import {makeSelectPollRequestParams} from '../history/selectors';
import {getPollRequest} from '../history/actions';

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* makeTransfer({payload}: TAction<TMakeTransferRequest>) {
  const {
    gatheredInfo: {
      chainId: sourceChainId,
      destinationAccount,
      amount,
      predicate,
    },
    sourceAccount: {privateKey: signature, accountName: sender, publicKey},
    networkDetail,
    sourceToken,
    estimatedGasFee,
  } = payload;
  const {version, instance} = networkDetail;

  const isCrossTransfer = sourceChainId !== destinationAccount?.chainId;

  const getTransferCmd = () => {
    const transferParams: TGetTransferParams = {
      instance,
      version,
      sender,
      sourceChainId,
      predicate,
      receiverPublicKey: destinationAccount?.publicKey || undefined,
      targetChainId: destinationAccount?.chainId!,
      token: sourceToken?.tokenAddress || 'coin',
      gasLimit: estimatedGasFee?.gasLimit
        ? (Number(estimatedGasFee?.gasLimit) || 0).toFixed(2)
        : undefined,
      gasPrice: estimatedGasFee?.gasPrice
        ? (Number(estimatedGasFee?.gasPrice) || 0).toFixed(8)
        : undefined,
      receiver: destinationAccount!.accountName,
      publicKey,
      signature,
      amount,
      ...getNetworkParams(networkDetail),
    };

    return isCrossTransfer
      ? getCrossTransferRequest(transferParams)
      : getSimpleTransferRequest(transferParams);
  };

  try {
    const reqParams = {
      instance,
      version,
      sourceChainId,
      ...getNetworkParams(networkDetail),
    };

    let {data: cmdValue} = yield getTransferCmd();

    const {data: txRes}: AxiosResponse = yield getSendRequest(
      queryString.stringify({
        cmdValue: JSON.stringify(cmdValue),
        ...reqParams,
      }),
    );

    const reqKey = txRes.requestKeys[0];
    yield put(
      setSendResult({
        amount,
        requestKey: reqKey,
        status: 'pending',
        createdTime: new Date().toISOString(),
        sender,
        sourceChainId,
        coinShortName: sourceToken?.tokenName || 'KDA',
        receiver: destinationAccount!.accountName,
        targetChainId: destinationAccount?.chainId!,
      }),
    );

    yield put(
      setTransferResult({
        message: 'Transfer Pending...',
        status: 'pending',
        date: new Date().toISOString(),
        requestKey: txRes.requestKeys[0],
        sender,
        sourceChainId,
        receiver: destinationAccount!.accountName,
        targetChainId: destinationAccount?.chainId!,
      }),
    );

    let listenResult: any;
    let listenAttempt: number = 0;
    while (!listenResult && listenAttempt < 100) {
      yield wait(10000);
      try {
        listenAttempt += 1;
        const {data: pollApiResult} = yield getPollRequestAPI(
          queryString.stringify({
            requestKeys: [txRes.requestKeys[0]],
            ...reqParams,
            chainId: sourceChainId,
          }),
        );
        if (pollApiResult && pollApiResult[txRes.requestKeys[0]]) {
          listenResult = pollApiResult[txRes.requestKeys[0]];
        }
      } catch (e) {}
    }
    if (!listenResult && listenAttempt >= 100) {
      throw new Error('Getting transaction result failed with timeout');
    }

    if (listenResult?.result?.status === 'failure') {
      yield put(
        setTransferResult({
          status: 'failure',
          date: new Date().toISOString(),
          message: 'Transfer Failed',
          requestKey: listenResult.reqKey,
          sender,
          sourceChainId,
          receiver: destinationAccount!.accountName,
          targetChainId: destinationAccount?.chainId!,
        }),
      );
      yield put(setListenResult(listenResult));
    } else if (listenResult?.continuation) {
      const pactId = listenResult.continuation.pactId;

      yield put(
        setTransferResult({
          status: 'pending',
          date: new Date().toISOString(),
          message: `Initiated from the Source Chain: ${JSON.stringify(
            pactId,
          )}. Waiting for Proof...`,
          requestKey: listenResult.reqKey,
          sender,
          sourceChainId,
          receiver: destinationAccount!.accountName,
          targetChainId: destinationAccount?.chainId!,
        }),
      );

      const spvCmd = {
        targetChainId:
          listenResult?.continuation?.yield?.provenance?.targetChainId ||
          destinationAccount?.chainId!,
        requestKey: pactId || listenResult.reqKey,
      };

      let proof: any = null;
      let proofAttempt: number = 0;
      while (!proof && proofAttempt < 100) {
        yield wait(10000);
        try {
          proofAttempt += 1;
          const spvResultResponse = yield getSpvRequest(
            queryString.stringify({
              ...reqParams,
              cmdValue: JSON.stringify(spvCmd),
              requestKey: listenResult.reqKey,
            }),
          );
          if (spvResultResponse.data) {
            proof = spvResultResponse.data;
          }
        } catch (e) {}
      }
      if (!proof && proofAttempt >= 100) {
        throw new Error('Waiting Proof failed with timeout');
      }

      const {data: newCmdValue} = yield getContinuationTransferRequest({
        instance,
        version,
        targetChainId:
          listenResult?.continuation?.yield?.provenance?.targetChainId ||
          destinationAccount?.chainId!,
        proof,
        pactId,
        ...getNetworkParams(networkDetail),
      });

      yield wait(30000);
      const {data: conTxResult}: AxiosResponse = yield getSendRequest(
        queryString.stringify({
          cmdValue: JSON.stringify(newCmdValue),
          ...reqParams,
          sourceChainId: destinationAccount?.chainId!,
        }),
      );

      yield put(
        setTransferResult({
          status: 'pending',
          date: new Date().toISOString(),
          message: `Initiated from the Source Chain: ${JSON.stringify(
            pactId || listenResult.reqKey,
          )}. Receiving from the Target Chain: ${conTxResult.requestKeys[0]}`,
          requestKey: conTxResult.requestKeys[0],
          sender,
          sourceChainId,
          receiver: destinationAccount!.accountName,
          targetChainId: destinationAccount?.chainId!,
        }),
      );

      yield put(
        replaceSendResult({
          amount,
          requestKey: conTxResult.requestKeys[0],
          sourceRequestKey: listenResult.reqKey || pactId,
          status: 'pending',
          createdTime: new Date().toISOString(),
          sender,
          sourceChainId,
          receiver: destinationAccount!.accountName,
          targetChainId: destinationAccount?.chainId!,
          coinShortName: sourceToken?.tokenName || 'KDA',
        }),
      );

      let conListenResult: any;
      let conListenAttempt: number = 0;
      while (!conListenResult && conListenAttempt < 100) {
        yield wait(10000);
        try {
          conListenAttempt += 1;
          const {data: conPollApiResult} = yield getPollRequestAPI(
            queryString.stringify({
              requestKeys: [conTxResult.requestKeys[0]],
              ...reqParams,
              chainId: destinationAccount?.chainId!,
            }),
          );
          if (
            conPollApiResult &&
            conPollApiResult[conTxResult.requestKeys[0]]
          ) {
            conListenResult = conPollApiResult[conTxResult.requestKeys[0]];
          }
        } catch (e) {}
      }
      if (!conListenResult && conListenAttempt >= 100) {
        throw new Error('Getting transaction result failed with timeout');
      }

      if (conListenResult?.result?.status === 'failure') {
        if (
          conListenResult?.result?.error?.message?.includes(
            'resumePact: pact completed:',
          )
        ) {
          yield put(
            setTransferResult({
              status: 'success',
              date: new Date().toISOString(),
              message: 'Transfer Successful',
              requestKey: conListenResult.reqKey,
              sender,
              sourceChainId,
              receiver: destinationAccount!.accountName,
              targetChainId: destinationAccount?.chainId!,
            }),
          );
          yield put(
            setListenResult({
              ...conListenResult,
              result: {
                ...conListenResult,
                status: 'success',
              },
            }),
          );
        } else {
          yield put(
            setTransferResult({
              status: 'failure',
              date: new Date().toISOString(),
              message: 'Transfer Failed',
              requestKey: conListenResult.reqKey,
              sender,
              sourceChainId,
              receiver: destinationAccount!.accountName,
              targetChainId: destinationAccount?.chainId!,
            }),
          );
          yield put(setListenResult(conListenResult));
        }
      } else if (conListenResult?.result?.status === 'success') {
        yield put(
          setTransferResult({
            status: 'success',
            date: new Date().toISOString(),
            message: 'Transfer Successful',
            requestKey: conListenResult.reqKey,
            sender,
            sourceChainId,
            receiver: destinationAccount!.accountName,
            targetChainId: destinationAccount?.chainId!,
          }),
        );
        yield put(setListenResult(conListenResult));
      } else {
        yield put(
          setTransferResult({
            status: 'failure',
            date: new Date().toISOString(),
            message: 'Transfer Failed',
            requestKey: conTxResult.requestKeys[0],
            sender,
            sourceChainId,
            receiver: destinationAccount!.accountName,
            targetChainId: destinationAccount?.chainId!,
          }),
        );
      }
    } else if (listenResult?.result?.status === 'success') {
      yield put(
        setTransferResult({
          status: 'success',
          date: new Date().toISOString(),
          message: 'Transfer Successful',
          requestKey: listenResult.reqKey,
          sender,
          sourceChainId,
          receiver: destinationAccount!.accountName,
          targetChainId: destinationAccount?.chainId!,
        }),
      );
      yield put(setListenResult(listenResult));
    } else {
      yield put(
        setTransferResult({
          status: 'failure',
          date: new Date().toISOString(),
          message: 'Transfer Failed',
          requestKey: txRes.requestKeys[0],
          sender,
          sourceChainId,
          receiver: destinationAccount!.accountName,
          targetChainId: destinationAccount?.chainId!,
        }),
      );
    }
    const pollReqParams = yield select(makeSelectPollRequestParams);
    yield put(getPollRequest(pollReqParams));
    const selectedNetwork = yield select(makeSelectActiveNetworkDetails);
    yield put(
      getBalances({
        ...selectedNetwork,
        ...getNetworkParams(selectedNetwork),
      }),
    );
  } catch (err) {
    const error = err as AxiosError;
    yield put(
      setTransferResult({
        status: 'failure',
        date: new Date().toISOString(),
        message: 'Transfer Failed',
        text: error?.response?.data || error?.message || '',
        requestKey: '',
        sender,
        sourceChainId,
        receiver: destinationAccount!.accountName,
        targetChainId: destinationAccount?.chainId!,
      }),
    );
  }
}

function* finishTransfer({payload}: TAction<TFinishTransferRequest>) {
  const {networkDetail, activity} = payload;
  const {version, instance} = networkDetail;

  const reqParams = {
    instance,
    version,
    sourceChainId: activity.sourceChainId!,
    ...getNetworkParams(networkDetail),
  };

  try {
    yield put(
      setTransferResult({
        status: 'pending',
        date: new Date().toISOString(),
        message: `Initiated from the Source Chain: ${JSON.stringify(
          activity.continuation.pactId! || activity.requestKey,
        )}. Waiting for Proof...`,
        requestKey: activity.requestKey,
        sender: activity.sender,
        sourceChainId: activity.sourceChainId,
        receiver: activity.receiver,
        targetChainId: activity.targetChainId,
      }),
    );

    const spvCmd = {
      targetChainId: activity.targetChainId!,
      requestKey: activity.continuation.pactId! || activity.requestKey,
    };

    let proof: any = null;
    let proofAttempt: number = 0;
    while (!proof && proofAttempt < 100) {
      yield wait(10000);
      try {
        proofAttempt += 1;
        const spvResultResponse = yield getSpvRequest(
          queryString.stringify({
            ...reqParams,
            cmdValue: JSON.stringify(spvCmd),
            requestKey: activity.requestKey,
          }),
        );
        if (spvResultResponse.data) {
          proof = spvResultResponse.data;
        }
      } catch (e) {}
    }

    if (!proof && proofAttempt >= 100) {
      throw new Error('Waiting Proof failed with timeout');
    }

    let {data: cmdValue} = yield getContinuationTransferRequest({
      instance,
      version,
      targetChainId: activity?.targetChainId!,
      proof,
      pactId: activity?.continuation?.pactId!,
      ...getNetworkParams(networkDetail),
    });

    yield wait(30000);
    const {data: txRes}: AxiosResponse = yield getSendRequest(
      queryString.stringify({
        cmdValue: JSON.stringify(cmdValue),
        ...reqParams,
        sourceChainId: activity.targetChainId!,
      }),
    );

    const reqKey = txRes.requestKeys[0];
    yield put(
      replaceSendResult({
        amount: activity.amount,
        requestKey: reqKey,
        sourceRequestKey: activity.continuation.pactId! || activity.requestKey,
        status: 'pending',
        createdTime: new Date().toISOString(),
        sender: activity.sender,
        sourceChainId: activity.sourceChainId,
        receiver: activity.receiver,
        targetChainId: activity.targetChainId,
        coinShortName: activity.coinShortName,
      }),
    );

    yield put(
      setTransferResult({
        status: 'pending',
        message: `Initiated from the Source Chain: ${JSON.stringify(
          activity?.continuation?.pactId! || activity.requestKey,
        )}. Receiving from the Target Chain: ${txRes.requestKeys[0]}`,
        date: new Date().toISOString(),
        requestKey: txRes.requestKeys[0],
        sender: activity.sender,
        sourceChainId: activity.sourceChainId,
        receiver: activity.receiver,
        targetChainId: activity.targetChainId,
      }),
    );

    let listenResult: any;
    let listenAttempt: number = 0;
    while (!listenResult && listenAttempt < 100) {
      yield wait(10000);
      try {
        listenAttempt += 1;
        const {data: pollApiResult} = yield getPollRequestAPI(
          queryString.stringify({
            requestKeys: [txRes.requestKeys[0]],
            ...reqParams,
            chainId: activity.targetChainId!,
          }),
        );
        if (pollApiResult && pollApiResult[txRes.requestKeys[0]]) {
          listenResult = pollApiResult[txRes.requestKeys[0]];
        }
      } catch (e) {}
    }
    if (!listenResult && listenAttempt >= 100) {
      throw new Error('Getting transaction result failed with timeout');
    }

    if (listenResult?.result?.status === 'failure') {
      if (
        listenResult?.result?.error?.message?.includes(
          'resumePact: pact completed:',
        )
      ) {
        yield put(
          setTransferResult({
            status: 'success',
            date: new Date().toISOString(),
            message: 'Transfer Successful',
            requestKey: listenResult.reqKey,
            sender: activity.sender,
            sourceChainId: activity.sourceChainId,
            receiver: activity.receiver,
            targetChainId: activity.targetChainId,
          }),
        );
        yield put(
          setListenResult({
            ...listenResult,
            result: {
              ...listenResult,
              status: 'success',
            },
          }),
        );
      } else {
        yield put(
          setTransferResult({
            status: 'failure',
            date: new Date().toISOString(),
            message: 'Transfer Failed',
            requestKey: listenResult.reqKey,
            sender: activity.sender,
            sourceChainId: activity.sourceChainId,
            receiver: activity.receiver,
            targetChainId: activity.targetChainId,
          }),
        );
        yield put(setListenResult(listenResult));
      }
    } else if (listenResult?.result?.status === 'success') {
      yield put(
        setTransferResult({
          status: 'success',
          date: new Date().toISOString(),
          message: 'Transfer Successful',
          requestKey: listenResult.reqKey,
          sender: activity.sender,
          sourceChainId: activity.sourceChainId,
          receiver: activity.receiver,
          targetChainId: activity.targetChainId,
        }),
      );
      yield put(setListenResult(listenResult));
    } else {
      yield put(
        setTransferResult({
          status: 'failure',
          date: new Date().toISOString(),
          message: 'Transfer Failed',
          requestKey: txRes.requestKeys[0],
          sender: activity.sender,
          sourceChainId: activity.sourceChainId,
          receiver: activity.receiver,
          targetChainId: activity.targetChainId,
        }),
      );
    }
    const pollReqParams = yield select(makeSelectPollRequestParams);
    yield put(getPollRequest(pollReqParams));
    const selectedNetwork = yield select(makeSelectActiveNetworkDetails);
    yield put(
      getBalances({
        ...selectedNetwork,
        ...getNetworkParams(selectedNetwork),
      }),
    );
  } catch (err) {
    const error = err as AxiosError;
    yield put(
      setTransferResult({
        status: 'failure',
        date: new Date().toISOString(),
        message: 'Transfer Failed',
        text: error?.response?.data || error?.message || '',
        requestKey: '',
        sender: activity.sender,
        sourceChainId: activity.sourceChainId,
        receiver: activity.receiver,
        targetChainId: activity.targetChainId,
      }),
    );
  }
}

function* swapRequest({payload}: TAction<TSwapRequest>) {
  yield put(swapRequestPending());
  try {
    const {data: txRes}: AxiosResponse = yield swapApiRequest(
      queryString.stringify(payload),
    );

    yield put(
      setSendResult({
        amount: 0,
        coinShortName: '',
        amountFrom: payload.token0Amount,
        amountTo: payload.token1Amount,
        tokenAddressFrom: payload.token0Address,
        tokenAddressTo: payload.token1Address,
        coinFrom: payload.token0Coin,
        coinTo: payload.token1Coin,
        requestKey: txRes.requestKeys[0],
        status: 'pending',
        createdTime: new Date().toISOString(),
        sender: '',
        sourceChainId: payload.chainId,
        receiver: '',
        targetChainId: payload.chainId,
        type: 'SWAP',
      }),
    );

    let listenResult: any;
    let listenAttempt: number = 0;
    while (!listenResult && listenAttempt < 100) {
      yield wait(10000);
      try {
        listenAttempt += 1;
        const {data: pollApiResult} = yield getPollRequestAPI(
          queryString.stringify({
            requestKeys: [txRes.requestKeys[0]],
            ...payload,
          }),
        );
        if (pollApiResult && pollApiResult[txRes.requestKeys[0]]) {
          listenResult = pollApiResult[txRes.requestKeys[0]];
        }
      } catch (e) {}
    }
    if (!listenResult && listenAttempt >= 100) {
      throw new Error('Getting transaction result failed with timeout');
    }

    yield put(setListenResult(listenResult));
    const pollReqParams = yield select(makeSelectPollRequestParams);
    yield put(getPollRequest(pollReqParams));
    const selectedNetwork = yield select(makeSelectActiveNetworkDetails);
    yield put(
      getBalances({
        ...selectedNetwork,
        ...getNetworkParams(selectedNetwork),
      }),
    );

    yield put(swapRequestFulfilled());
  } catch (err) {
    yield put(swapRequestError());
  }
}

export function* transfersSaga() {
  yield takeEvery(MAKE_TRANSFER_REQUEST, makeTransfer);
  yield takeEvery(FINISH_TRANSFER_REQUEST, finishTransfer);
  yield takeEvery(SWAP_REQUEST, swapRequest);
}
