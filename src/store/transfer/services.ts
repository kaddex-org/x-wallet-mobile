import {TGetTransferContParams} from './types';
import {getTransferCross} from '../../api/kadena/transferCross';
import {getTransferSingle} from '../../api/kadena/transferSingle';
import {getTransferContinuation} from '../../api/kadena/transferContinuation';
import {getSpv} from '../../api/kadena/spv';
import {getSend} from '../../api/kadena/send';
import {getSwap} from '../../api/kadena/swap';
import {getPoll} from '../../api/kadena/poll';
import {getSign} from '../../api/kadena/sign';

export const getCrossTransferRequest = async (params: any) => {
  return await getTransferCross(params);
};

export const getSimpleTransferRequest = async (params: any) => {
  return await getTransferSingle(params);
};

export const getContinuationTransferRequest = async (
  params: TGetTransferContParams,
) => {
  return await getTransferContinuation(params);
};

export const getSpvRequest = async (params: any) => {
  return await getSpv(params);
};

export const getSendRequest = async (params: any) => {
  return await getSend(params);
};

export const swapApiRequest = async (params: any) => {
  return await getSwap(params);
};

export const getPollRequest = async (params: any) => {
  return await getPoll(params);
};

export const getSignRequest = async (params: any) => {
  return await getSign(params);
};
