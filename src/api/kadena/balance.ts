import {
  getBalanceFromApiResponse,
  getPactHost,
  switchBetweenConfig,
} from '../utils';
import {Pact} from '../pactLangApi';
import {defaultChainIds} from '../constants';
import {DefaultQueryParams} from '../types';

interface BlockQueryParams extends DefaultQueryParams {
  instance: string;
  version: string;
  chainIds: string[];
  token: string;
  accountName: string;
  customHost?: string | undefined | null;
}

export interface BalanceResponseData {
  totalAmount: number;
  chainBalance: {[key: string]: number};
}

const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const dumMeta = (chainId: string) =>
  Pact.lang.mkMeta('not-real', chainId, 0.00000001, 6000, creationTime(), 600);

export const getBalance: (
  params: BlockQueryParams,
) => Promise<BalanceResponseData> = async ({
  customHost,
  network,
  accountName,
  token,
  instance,
  version,
  chainIds,
}) => {
  if (
    !network ||
    !accountName ||
    !token ||
    !chainIds ||
    chainIds.length === 0 ||
    !instance ||
    !version
  ) {
    throw new Error('Wrong Parameters: request getBalance');
  }
  const getChainBalance = async () => {
    const chainBalance: any = {};
    await Promise.all(
      (chainIds || defaultChainIds).map(async (chainId: string) => {
        try {
          const response = await Pact.fetch.local(
            {
              pactCode: `(${token}.details ${JSON.stringify(accountName)})`,
              meta: dumMeta(chainId),
            },
            getPactHost(network, version, instance, chainId, customHost),
          );
          chainBalance[chainId] = getBalanceFromApiResponse(response);
        } catch (e) {
          chainBalance[chainId] = 0;
        }
      }),
    );
    return chainBalance;
  };
  return await switchBetweenConfig(
    network,
    async () => {
      const chainBalance = await getChainBalance();
      const totalAmount = Object.values(chainBalance).reduce(
        (accum: number, cum: any) => Number(accum) + Number(cum),
        0,
      );
      return {
        totalAmount,
        chainBalance,
      };
    },
    async () => {
      const chainBalance = await getChainBalance();
      const totalAmount = Object.values(chainBalance).reduce(
        (accum: number, cum: any) => Number(accum) + Number(cum),
        0,
      );
      return {
        totalAmount,
        chainBalance,
      };
    },
    async () => {
      if (customHost) {
        const chainBalance = await getChainBalance();
        const totalAmount = Object.values(chainBalance).reduce(
          (accum: number, cum: any) => Number(accum) + Number(cum),
          0,
        );
        return {
          totalAmount,
          chainBalance,
        };
      } else {
        throw new Error('Wrong Parameters: request getBalance');
      }
    },
  );
};
