import {TChainId} from '../userWallet/types';
import {TDefaultRequestState} from '../types';

export type TActivityStatus = 'success' | 'failure' | 'pending';

export type TActivity = {
  requestKey: string; // for each Activity UNIQUE requestKey
  sourceRequestKey?: string;
  createdTime: string; // Date time ISO string
  sourceChainId: TChainId;
  targetChainId: TChainId;
  sender: string;
  receiver: string;
  status: TActivityStatus;
  coinShortName: string;
  amount: number;
  amountFrom?: number;
  amountTo?: number;
  coinFrom?: number;
  coinTo?: number;
  tokenAddressFrom?: number;
  tokenAddressTo?: number;
  gas?: number | null;
  logs?: string | null;
  metaData?: any | null;
  continuation?: any | null;
  type?: string;
};

export type TPollRequestParams = {
  requestKeys: string[]; // from grouped activities
  instance: string; // from selectedNetwork
  version: string; // from selectedNetwork
  chainId: string; // senderChainId
};

export type TPollRespItem = {
  gas: number;
  result: {status: TActivityStatus; data: string; error?: any}; // result.status
  reqKey: string; // request key
  logs: string;
  metaData: null;
  continuation: null;
};

export type TPollResp = Record<string, TPollRespItem>;

export type THistoryState = {
  activities: TActivity[];
  pollReqState: TDefaultRequestState<TPollResp[]>;
};
