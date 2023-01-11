import {DefaultQueryParams} from '../types';
import {Pact} from '../pactLangApi';
import {getPactHost} from '../utils';

interface PactQueryParams extends DefaultQueryParams {
  pactCode: string;
  instance: string;
  version: string;
  chainId: string | number;
  customHost?: string | undefined | null;
}

export const getPact: (params: PactQueryParams) => Promise<any> = async ({
  customHost,
  network,
  instance,
  chainId,
  pactCode,
  version,
}) => {
  if (chainId === undefined || !instance || !network || !version || !pactCode) {
    throw new Error('Wrong Parameters: request getPact');
  }
  const createTime = () => Math.round(new Date().getTime() / 1000) - 60;
  const detailsResponse = await Pact.fetch.local(
    {
      pactCode,
      keyParis: [],
      meta: Pact.lang.mkMeta(
        'not-real',
        `${chainId}`,
        0.0000001,
        150000,
        createTime(),
        600,
      ),
    },
    getPactHost(network, version, instance, chainId, customHost),
  );
  return detailsResponse?.result?.data || [];
};
