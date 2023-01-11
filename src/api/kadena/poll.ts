import {DefaultQueryParams} from '../types';
import {getPactHost} from '../utils';
import {Pact} from '../pactLangApi';

interface PollQueryParams extends DefaultQueryParams {
  requestKeys: string[];
  instance: string;
  version: string;
  chainId: string;
  customHost?: string | undefined | null;
}

export const getPoll: (params: PollQueryParams) => Promise<any> = async ({
  customHost,
  network,
  instance,
  chainId,
  requestKeys,
  version,
}) => {
  if (
    !requestKeys ||
    requestKeys.length === 0 ||
    chainId === undefined ||
    !instance ||
    !network ||
    !version
  ) {
    throw new Error('Wrong Parameters: request getPoll');
  }
  const pollResponse = await Pact.fetch.poll(
    {
      requestKeys: Array.isArray(requestKeys) ? requestKeys : [requestKeys],
    },
    getPactHost(network, version, instance, chainId, customHost),
  );
  return pollResponse;
};
