import {APIRemoteRoute, NetworkName, NodeHash} from './types';
import {
  DEV_NETWORK_API_URL,
  MAIN_NETWORK_API_URL,
  TEST_NETWORK_API_URL,
} from './constants';

export const getTimestamp = () => Math.floor(new Date().getTime() / 1000) - 90;

export function convertJSONToArray<T>(json: Record<string, unknown>): T[] {
  return Object.keys(json).map(key => json[key]) as T[];
}

export const getMaxHeightFromHashes = (hashes: NodeHash[]) => {
  return Math.max(0, ...(hashes || []).map(item => item.height));
};

const getElementFromArrayByIndex = (array: any[], index: number) => {
  if (array && Array.isArray(array) && array.length > index) {
    return array[index];
  }
  return null;
};

export function getChainIds(
  nodeChains: string[],
  nodeGraphHistory: any[],
  height?: number | null,
): string[] {
  if (height) {
    const filteredChainGraphs: any[] = (nodeGraphHistory || []).filter(
      (item: any[]) => getElementFromArrayByIndex(item, 0) >= height,
    );
    const firstChainGraph = getElementFromArrayByIndex(filteredChainGraphs, 0);
    if (firstChainGraph) {
      const chainGraphs = getElementFromArrayByIndex(firstChainGraph, 1);
      if (chainGraphs) {
        return chainGraphs.map((chainGraph: any[]) =>
          getElementFromArrayByIndex(chainGraph, 0).toString(),
        );
      }
    }
  }
  return nodeChains || [];
}

export const getBalanceFromApiResponse = (res: any) => {
  let balance = 0;
  if (typeof res?.result?.data?.balance === 'number') {
    balance = res?.result?.data?.balance;
  } else if (
    res?.result?.data?.balance?.decimal &&
    !Number.isNaN(res?.result?.data?.balance?.decimal)
  ) {
    balance = Number(res?.result?.data?.balance?.decimal);
  }
  return balance;
};

export const getPactHost = (
  network: NetworkName | string,
  version: string,
  instance: string,
  chainId: string | number,
  customHost?: string | null,
) => {
  switch (network?.toLowerCase()) {
    case NetworkName.MAIN_NETWORK.toLowerCase():
      return `${MAIN_NETWORK_API_URL}${APIRemoteRoute.ChainWeb}/${version}/${instance}${APIRemoteRoute.BlockChain}/${chainId}${APIRemoteRoute.Pact}`;
    case NetworkName.TEST_NETWORK.toLowerCase():
      return `${TEST_NETWORK_API_URL}${APIRemoteRoute.ChainWeb}/${version}/${instance}${APIRemoteRoute.BlockChain}/${chainId}${APIRemoteRoute.Pact}`;
    case NetworkName.DEV_NETWORK.toLowerCase():
      return `${DEV_NETWORK_API_URL}${APIRemoteRoute.ChainWeb}/${version}/${instance}${APIRemoteRoute.BlockChain}/${chainId}${APIRemoteRoute.Pact}`;
    case NetworkName.CUSTOM_NETWORK.toLowerCase():
      return `${customHost}${APIRemoteRoute.ChainWeb}/${version}/${instance}${APIRemoteRoute.BlockChain}/${chainId}${APIRemoteRoute.Pact}`;
    default:
      return `${MAIN_NETWORK_API_URL}${APIRemoteRoute.ChainWeb}/${version}/${instance}${APIRemoteRoute.BlockChain}/${chainId}${APIRemoteRoute.Pact}`;
  }
};

export const switchBetweenConfig = async (
  network: NetworkName | string,
  test: () => Promise<any>,
  main: () => Promise<any>,
  defaultFunc?: () => any,
) => {
  switch (network?.toLowerCase()) {
    case NetworkName.MAIN_NETWORK.toLowerCase():
      return main();
    case NetworkName.TEST_NETWORK.toLowerCase():
    case NetworkName.DEV_NETWORK.toLowerCase():
      return test();
    default:
      if (defaultFunc) {
        return defaultFunc();
      }
      break;
  }
  throw new Error('Wrong Parameters: invalid network');
};
