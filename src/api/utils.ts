import {NodeHash} from './types';

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
