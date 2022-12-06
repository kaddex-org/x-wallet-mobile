export enum APIRoute {
  Info = '/api/info',
  Chain = '/api/chain',
  Stats = '/api/stats',
  Recent = '/api/recent',
  Search = '/api/search',
  Transaction = '/api/transaction',
  Block = '/api/block',
}

export enum APIRemoteRoute {
  Config = '/info',
  Info = '/cut',
  ChainWeb = '/chainweb',
  Stats = '/stats',
  BlockChain = '/chain',
  BlockHeader = '/header',
  Updates = '/updates',
  Search = '/search',
  PactApi = '/pact/api/v1',
  Pact = '/pact',
  Poll = '/poll',
  Tx = '/tx',
  Txs = '/txs',
  Events = '/events',
  Recent = '/recent',
  Payload = '/payload',
  Outputs = '/outputs',
  Branch = '/branch',
  Local = '/local',
  Send = '/send',
}

export enum NetworkName {
  TEST_NETWORK = 'Testnet',
  MAIN_NETWORK = 'Mainnet',
}

export type NodeInstance = {
  name: NetworkName;
  url: string;
  instance: string;
  version: string;
  numberOfChains: number;
  chainIds: string[];
  chainGraphs: any[];
};

export enum TransactionStatus {
  Success = 'TxSucceeded',
  Fail = 'TxFailed',
}

export type TransactionDetail = {
  blockHash: string;
  blockTime: string;
  chainId: number;
  preview: string;
  height: number;
  creationTime: string;
  requestKey: string;
  status: TransactionStatus;
  sender: string;
  data: any;
  result: {amount: number; token: string}[];
  events: {name: string; params: string[]}[];
  gas: number;
  gasLimit: number;
  gasPrice: number;
  logs: string;
  metadata: string | null;
  nonce: string;
  pactId: string | null;
  proof: string | null;
  rollback: string | null;
  step: number | null;
  success: boolean;
  ttl: number;
  id: number;
  continuation: string | null;
};

export type BlockDetail = {
  neighbours: Record<string, string>;
  chainId: number;
  chainVersion: string;
  creationTime: number;
  epochStart: number;
  weight: string;
  featureFlags: number;
  hash: string;
  nonce: string;
  parent: string;
  payloadHash: string;
  target: string;
  height: number;
  powHash: string;
};

export type NodeHash = {
  hash: string;
  height: number;
};

export type DefaultQueryParams = {
  network: NetworkName;
};

export type PaginationParams = {
  offset?: number;
  limit?: number;
};

export type NodeInfoResponseData = {
  hashes: NodeHash[];
  height: number;
  id: string;
  instance: string;
  version: string;
  origin: string | null;
  weight: string;
  chainIds: string[];
};
