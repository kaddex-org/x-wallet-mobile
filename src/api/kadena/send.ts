import {DefaultQueryParams} from '../types';
import {getPactHost} from '../utils';

interface SendQueryParams extends DefaultQueryParams {
  instance: string;
  version: string;
  sourceChainId: string;
  customHost?: string | null;
  cmdValue: string; // JSON string
}

export const getSend: (params: SendQueryParams) => Promise<any> = async ({
  customHost,
  network,
  instance,
  sourceChainId,
  version,
  cmdValue,
}) => {
  if (
    !instance ||
    !network ||
    !version ||
    sourceChainId === undefined ||
    !cmdValue
  ) {
    throw new Error('Wrong Parameters: request getSend');
  }
  const txRes = await fetch(
    `${getPactHost(
      network,
      version,
      instance,
      sourceChainId,
      customHost,
    )}/api/v1/send`,
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
