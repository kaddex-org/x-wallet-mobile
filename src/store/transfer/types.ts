import {TAccount, TChainId, TWallet} from '../userWallet/types';
import {TNetworkDetail} from '../networks/types';
import {TActivity} from '../history/types';

export type TGatheredTransferInfo = {
  destinationAccount?: TAccount;
  predicate?: string;
  chainId?: TChainId;
  amount?: number;
};

export type TTransferResult = {
  status?: string;
  requestKey?: string;
  text?: string;
  message?: string;
  date?: string;
  sourceChainId: TChainId;
  targetChainId: TChainId;
  sender: string;
  receiver: string;
};

export enum EGAsSpeed {
  ECONOMY = 'economy',
  NORMAL = 'normal',
  FAST = 'fast',
}

export type TEstimatedGasFee = {
  speed: EGAsSpeed;
  gasPrice: number;
  gasLimit: number;
};

export type TTransferFinishResult = TTransferResult;

export type TTransferState = {
  gatheredTransferInfo: TGatheredTransferInfo;
  transferResult: TTransferResult | null;
  showTransferBubble: boolean;
  estimatedGasFee: TEstimatedGasFee;
  isSwapping: boolean;
};

export type TMakeTransferRequest = {
  networkDetail: TNetworkDetail;
  gatheredInfo: TGatheredTransferInfo;
  sourceAccount: TAccount;
  sourceToken?: TWallet | null;
  estimatedGasFee: TEstimatedGasFee;
};

export type TFinishTransferRequest = {
  networkDetail: TNetworkDetail;
  activity: TActivity;
};

export type TGetTransferParams = {
  instance: string;
  version: string;
  sender: string;
  receiver: string;
  sourceChainId?: TChainId;
  targetChainId?: TChainId;
  publicKey?: string;
  signature?: string; // privateKey
  gasPrice?: string;
  gasLimit?: string;
  token?: string;
  amount?: number;
  predicate?: string;
  receiverPublicKey?: string;
  network: string;
};

export type TGetTransferContParams = {
  instance: string;
  version: string;
  targetChainId: TChainId;
  proof: string;
  pactId: string;
  network: string;
};

export type TSwapRequest = {
  instance: string;
  version: string;
  chainId: string;
  customHost: string;
  publicKey?: string;
  signature?: string; // private key
  token0Amount: number;
  token1Amount: number;
  token0AmountWithSlippage: number;
  token1AmountWithSlippage: number;
  token0Address: string;
  token1Address: string;
  token0Coin: string;
  token1Coin: string;
  accountName: string;
  isSwapIn: boolean;
  network: string;
  gasPrice?: number;
  gasLimit?: number;
  ttl?: number;
  gasStationEnabled: boolean;
};
