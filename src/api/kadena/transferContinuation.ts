import {DefaultQueryParams} from '../types';
import {Pact} from '../pactLangApi';

interface TransferContinuationQueryParams extends DefaultQueryParams {
  instance: string;
  version: string;
  targetChainId: string;
  proof: string;
  pactId: string;
}

export const getTransferContinuation: (
  params: TransferContinuationQueryParams,
) => Promise<any> = async ({
  pactId,
  network,
  instance,
  version,
  proof,
  targetChainId,
}) => {
  if (
    !network ||
    !version ||
    !instance ||
    !pactId ||
    targetChainId === undefined ||
    !proof
  ) {
    throw new Error('Wrong Parameters: request getContinuation');
  }

  const meta = Pact.lang.mkMeta(
    'xwallet-xchain-gas',
    targetChainId,
    0.00000001,
    1100,
    Math.round(new Date().getTime() / 1000) - 50,
    28800,
  );

  const contCmd = {
    type: 'cont',
    keyPairs: [],
    pactId,
    rollback: false,
    step: 1,
    meta,
    proof,
    networkId: instance,
  };

  return Pact.simple.cont.createCommand(
    contCmd.keyPairs,
    undefined,
    contCmd.step,
    contCmd.pactId,
    contCmd.rollback,
    undefined,
    contCmd.meta,
    contCmd.proof,
    contCmd.networkId,
  );
};
