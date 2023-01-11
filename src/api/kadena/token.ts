import {DefaultQueryParams} from '../types';
import {Pact} from '../pactLangApi';
import {defaultChainIds} from '../constants';
import {getPactHost} from '../utils';

interface TokenQueryParams extends DefaultQueryParams {
  instance: string;
  version: string;
  chainIds: string[];
  token: string;
  accountName: string;
  customHost?: string | undefined | null;
}

const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const dumMeta = (chainId: string) =>
  Pact.lang.mkMeta('not-real', chainId, 0.00001, 2500, creationTime(), 600);

export const getToken: (params: TokenQueryParams) => Promise<boolean> = async ({
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
    throw new Error('Wrong Parameters: request getToken');
  }
  const checkIfTokenExists = async () => {
    const responses = await Promise.all(
      (chainIds || defaultChainIds).map(async (chainId: string) => {
        try {
          const response = await Pact.fetch.local(
            {
              pactCode: `(${token}.details ${JSON.stringify(accountName)})`,
              meta: dumMeta(chainId),
            },
            getPactHost(network, version, instance, chainId, customHost),
          );
          const result = response.result;
          return !!(
            result?.error?.message?.startsWith('with-read: row not found') ||
            result?.status === 'success'
          );
        } catch (e) {
          return false;
        }
      }),
    );
    return responses.some(item => item);
  };
  return await checkIfTokenExists();
};
