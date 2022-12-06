import {TDefaultRequestState, TNetworkParams} from '../types';

export type TChainId = string;

export type TChainBalance = Record<string, number>;

export type TWallet = {
  tokenAddress: string;
  tokenName: string;
  totalAmount: number;
  chainBalance: TChainBalance;
};

export type TUsdEquivalent = {
  token: string;
  usd: number;
};

export type TAccount = {
  accountName: string;
  wallets: TWallet[];
  publicKey?: string;
  privateKey?: string;
  chainId?: TChainId;
};

export type TAccountImportRequest = {
  accountName: string;
  privateKey: string;
  seeds?: string;
  accountIndex?: number;
  instance: string;
  version: string;
  chainId: string;
  chainIds: string[];
} & TNetworkParams;

export type TUserWalletState = {
  initialized: boolean;
  accounts: TAccount[];
  selectedAccount: TAccount | null;
  selectedToken: TWallet | null;
  balanceDetailState: TDefaultRequestState<TBalanceData>;
  usdEquivalents: TUsdEquivalent[];
  isConnectedWalletConnect: boolean;
  searchTokenList: string[];
  nonTransferableTokenList: string[];
};

export type TBalancesRequest = {
  instance: string;
  version: string;
  chainIds: string[];
} & TNetworkParams;

export type TGenAccountParams = {
  accountName?: string;
  seeds?: string;
  accountIndex?: number;
};

export type TBalanceResponse = {
  totalAmount: number;
  chainBalance: TChainBalance;
};

export type TEstimatedUsdResponse = {
  kadena: {usd: number};
  gas: {usd: number};
};

export type TBalanceData = TBalanceResponse & {usdEquivalent: number};

export type TRestoreAccountParams = {
  seeds: string;
  accountIndex?: number;
};

export type TSearchTokenListParams = {
  instance: string; // from selectedNetwork
  version: string; // from selectedNetwork
} & TNetworkParams;
