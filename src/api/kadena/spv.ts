import {DefaultQueryParams} from '../types';
import {getPactHost} from '../utils';

interface SPVQueryParams extends DefaultQueryParams {
  requestKey: string;
  instance: string;
  version: string;
  sourceChainId: string;
  customHost?: string | null;
  cmdValue: string; // JSON string
}

export const getSpv: (params: SPVQueryParams) => Promise<any> = async ({
  customHost,
  network,
  instance,
  sourceChainId,
  requestKey,
  version,
  cmdValue,
}) => {
  if (
    !requestKey ||
    sourceChainId === undefined ||
    !instance ||
    !network ||
    !version ||
    !cmdValue
  ) {
    throw new Error('Wrong Parameters: request getSpv');
  }
  const txRes = await fetch(
    `${getPactHost(network, version, instance, sourceChainId, customHost)}/spv`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: cmdValue,
    },
  );
  if (txRes.status >= 400) {
    throw new Error(await txRes.text());
  } else {
    return await txRes.json();
  }
};
