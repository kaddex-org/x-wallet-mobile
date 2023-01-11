import axios, {AxiosError, AxiosResponse} from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';

import {TAction} from '../types';
import {
  TAccount,
  TAccountImportRequest,
  TEstimatedUsdResponse,
  TGenAccountParams,
  TBalancesRequest,
  TWallet,
  TSearchTokenListParams,
} from './types';
import {
  GET_BALANCES_REQUEST,
  GET_GENERATE_ACCOUNT_REQUEST,
  GET_IMPORT_ACCOUNT_REQUEST,
  GET_TOKEN_LIST,
  getBalances,
  getGenerateAccount,
} from './actions';
import {
  addNewAccount,
  setBalanceDetailError,
  setBalanceDetailLoading,
  setBalanceDetailSuccess,
  setNonTransferableTokenList,
  setSearchTokenList,
  setSelectedAccount,
  setUsdEquivalents,
} from './index';
import {Alert} from 'react-native';
import {makeSelectAccounts, makeSelectSelectedAccount} from './selectors';
import {makeSelectGeneratedPhrases} from '../auth/selectors';
import {defaultWallets, reverseCoins} from './const';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {TRestoreAccountParams} from './types';
import {GET_RESTORE_ACCOUNT} from './actions';
import {KADDEX_NAMESPACE, nonTransferableTokens} from '../../api/constants';
import {
  getTokenUsdPriceByLiquidity,
  reduceBalance,
} from '../../utils/numberHelpers';
import {getBalance} from '../../api/kadena/balance';
import {getPact} from '../../api/kadena/pact';
import {generateAccount} from '../../api/kadena/generateAccount';
import {getAccount} from '../../api/kadena/account';

function* getBalancesRequest({payload}: TAction<TBalancesRequest>) {
  yield put(setBalanceDetailLoading(true));
  try {
    const selectedAccount: TAccount | null = yield select(
      makeSelectSelectedAccount,
    );

    const balancesForWallet: TWallet[] = yield Promise.all(
      (selectedAccount?.wallets || []).map(async (walletItem: TWallet) => {
        const balanceResponse = await getBalance({
          ...payload,
          accountName: selectedAccount?.accountName,
          token: walletItem.tokenAddress,
        } as any);
        return {
          ...walletItem,
          ...(balanceResponse || {}),
        };
      }),
    );
    yield put(setBalanceDetailLoading(false));
    yield put(setBalanceDetailSuccess(balancesForWallet));

    let estimatedUsdResponse: any;
    try {
      const usdResponse: AxiosResponse<TEstimatedUsdResponse> = yield axios.get(
        'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=kadena,gas',
      );
      estimatedUsdResponse = usdResponse?.data;
    } catch (e) {}

    const tokenPairList = (selectedAccount?.wallets || [])
      .filter(item => item.tokenAddress !== 'coin')
      .map((walletItem: TWallet) => {
        if (reverseCoins.includes(walletItem.tokenAddress)) {
          return `[${walletItem.tokenAddress} coin] `;
        } else {
          return `[coin ${walletItem.tokenAddress}] `;
        }
      });

    const tokenPairListResponse: any[] = yield Promise.all(
      tokenPairList.map(async pairList => {
        try {
          const tokenListDetails = await getPact({
            ...payload,
            chainId: '2',
            pactCode: `
              (namespace 'free)
  
              (module ${KADDEX_NAMESPACE}-read G
  
                (defcap G ()
                  true)
  
                (defun pair-info (pairList:list)
                  (let* (
                    (token0 (at 0 pairList))
                    (token1 (at 1 pairList))
                    (p (${KADDEX_NAMESPACE}.exchange.get-pair token0 token1))
                    (reserveA (${KADDEX_NAMESPACE}.exchange.reserve-for p token0))
                    (reserveB (${KADDEX_NAMESPACE}.exchange.reserve-for p token1))
                    (totalBal (${KADDEX_NAMESPACE}.tokens.total-supply (${KADDEX_NAMESPACE}.exchange.get-pair-key token0 token1)))
                  )
                  [(${KADDEX_NAMESPACE}.exchange.get-pair-key token0 token1)
                   reserveA
                   reserveB
                   totalBal
                 ]
                ))
              )
              (map (${KADDEX_NAMESPACE}-read.pair-info) [${pairList}])
               `,
          } as any);
          return tokenListDetails || [];
        } catch (e) {
          return [];
        }
      }),
    );

    const tokenListDetailsData = tokenPairListResponse.flat(1);
    const tokenLiquidityData = (tokenListDetailsData || []).reduce(
      (accum: any, data: any[]) => {
        accum[data[0]] = {
          supply: data[3],
          reserves: [data[1], data[2]],
        };
        return accum;
      },
      {},
    );

    const tokenUsdData = (selectedAccount?.wallets || [])
      .map((walletItem: TWallet) => {
        if (walletItem.tokenAddress === 'coin') {
          return {
            token: walletItem.tokenAddress,
            usd: estimatedUsdResponse?.kadena?.usd || 0,
          };
        }
        if (tokenLiquidityData[`${walletItem.tokenAddress}:coin`]) {
          const coinPair =
            tokenLiquidityData[`${walletItem.tokenAddress}:coin`];
          if (coinPair) {
            const liquidity0 = reduceBalance(coinPair.reserves[0]);
            const liquidity1 = reduceBalance(coinPair.reserves[1]);
            return {
              token: walletItem.tokenAddress,
              usd: getTokenUsdPriceByLiquidity(
                liquidity1,
                liquidity0,
                estimatedUsdResponse?.kadena?.usd || 0,
                16,
              ),
            };
          }
        } else if (tokenLiquidityData[`coin:${walletItem.tokenAddress}`]) {
          const coinPair =
            tokenLiquidityData[`coin:${walletItem.tokenAddress}`];
          if (coinPair) {
            const liquidity0 = reduceBalance(coinPair.reserves[0]);
            const liquidity1 = reduceBalance(coinPair.reserves[1]);
            return {
              token: walletItem.tokenAddress,
              usd: getTokenUsdPriceByLiquidity(
                liquidity0,
                liquidity1,
                estimatedUsdResponse?.kadena?.usd || 0,
                16,
              ),
            };
          }
        }
        return null;
      })
      .filter(item => item !== null);
    tokenUsdData.push({
      token: 'gas',
      usd: estimatedUsdResponse?.gas?.usd || 0,
    });
    if (
      tokenUsdData.some(item => item?.token === 'kaddex.kdx') &&
      !tokenUsdData.some(item => item?.token === 'kaddex.skdx')
    ) {
      const tokenKDXUsdData = tokenUsdData.find(
        item => item?.token === 'kaddex.kdx',
      );
      if (tokenKDXUsdData) {
        tokenUsdData.push({
          token: 'kaddex.skdx',
          usd: tokenKDXUsdData.usd || 0,
        });
      }
    }
    yield put(setUsdEquivalents(tokenUsdData));
    yield put(setBalanceDetailLoading(false));
  } catch (err) {
    yield put(setBalanceDetailError(err));
    yield put(setBalanceDetailLoading(false));
  }
}

function* getGenerateAccountRequest({payload}: TAction<TGenAccountParams>) {
  try {
    const seedsFromState = yield select(makeSelectGeneratedPhrases);
    const seeds = payload?.seeds || seedsFromState;
    const data: TAccount = yield generateAccount({
      seeds,
      accountIndex: payload?.accountIndex || 0,
    });
    if (seeds !== undefined) {
      const accounts: TAccount[] = yield select(makeSelectAccounts);
      if (accounts.some(item => item.publicKey === data.publicKey)) {
        yield put(
          getGenerateAccount({
            ...(payload || {}),
            accountIndex: (payload?.accountIndex || 0) + 1,
          }),
        );
      } else {
        yield put(
          addNewAccount({
            ...data,
            chainId: 0,
            wallets: defaultWallets,
          }),
        );
        yield put(
          setSelectedAccount({
            ...data,
            chainId: 0,
            wallets: defaultWallets,
          }),
        );
      }
    } else {
      yield put(
        addNewAccount({
          ...data,
          chainId: 0,
          wallets: defaultWallets,
        }),
      );
      yield put(
        setSelectedAccount({
          ...data,
          chainId: 0,
          wallets: defaultWallets,
        }),
      );
    }
  } catch (e) {}
}

function* getImportAccountRequest({payload}: TAction<TAccountImportRequest>) {
  try {
    const data: TAccount = yield getAccount(payload as any);
    yield put(
      addNewAccount({
        ...data,
        chainId: payload?.chainId || 0,
        wallets: defaultWallets,
      }),
    );
    yield put(getBalances(payload));
  } catch (err) {
    const error = err as AxiosError;
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    Alert.alert(
      'Failed to import the account',
      error?.response?.data || error?.message,
    );
  }
}

function* getRestoreAccount({payload}: TAction<TRestoreAccountParams>) {
  try {
    const data = yield generateAccount(payload);
    yield put(
      addNewAccount({
        ...data,
        chainId: 0,
        wallets: defaultWallets,
      }),
    );
  } catch (err) {
    const error = err as AxiosError;
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    Alert.alert(
      'Failed to import the account',
      error?.response?.data || error?.message,
    );
  }
}

function* getTokenList({payload}: TAction<TSearchTokenListParams>) {
  try {
    const tokenListData = yield getPact({
      ...payload,
      chainId: '2',
      pactCode: '(list-modules)',
    } as any);
    const tokenList = (tokenListData || []).filter(
      (item: string) => item !== 'coin' && item !== 'kaddex.kdx',
    );
    yield put(setSearchTokenList(tokenList));
    yield put(setNonTransferableTokenList(nonTransferableTokens || []));
  } catch (err) {
    yield put(setSearchTokenList([]));
    yield put(setNonTransferableTokenList([]));
  }
}

export function* userWalletSaga() {
  yield takeLatest(GET_BALANCES_REQUEST, getBalancesRequest);
  yield takeLatest(GET_GENERATE_ACCOUNT_REQUEST, getGenerateAccountRequest);
  yield takeLatest(GET_IMPORT_ACCOUNT_REQUEST, getImportAccountRequest);
  yield takeLatest(GET_RESTORE_ACCOUNT, getRestoreAccount);
  yield takeLatest(GET_TOKEN_LIST, getTokenList);
}
