import {DefaultQueryParams} from '../types';
import {isPrivateKey, setSignatureIfNecessary} from '../../utils/kadenaHelpers';
import {Pact} from '../pactLangApi';
import {getPactHost} from '../utils';
import {convertDecimal} from '../../utils/numberHelpers';
import {getAccount} from './account';
import {Platform} from 'react-native';

interface TransferSingleQueryParams extends DefaultQueryParams {
  instance: string;
  version: string;
  sender: string;
  receiver: string;
  sourceChainId: string;
  publicKey: string;
  signature: string;
  amount: number;
  token?: string;
  gasPrice?: number;
  gasLimit?: number;
  receiverPublicKey?: number;
  predicate?: number;
  customHost?: string;
}

const getNonceByPlatform = (platform?: string) => {
  switch (platform) {
    case 'macos':
      return `"XM-${new Date().toISOString()}"`;
    case 'ios':
      return `"XI-${new Date().toISOString()}"`;
    case 'android':
      return `"XA-${new Date().toISOString()}"`;
    default:
      return `"${new Date().toISOString()}"`;
  }
};

export const getTransferSingle: (
  params: TransferSingleQueryParams,
) => Promise<any> = async ({
  signature,
  publicKey,
  gasPrice,
  gasLimit,
  network,
  instance,
  version,
  sender,
  receiver,
  token,
  amount,
  sourceChainId,
  predicate,
  receiverPublicKey,
  customHost,
}) => {
  if (
    !network ||
    !version ||
    !instance ||
    !sender ||
    !receiver ||
    sourceChainId === undefined ||
    !amount ||
    !signature ||
    !publicKey
  ) {
    throw new Error('Wrong Parameters: request getSingleChain');
  }

  const meta = Pact.lang.mkMeta(
    sender,
    sourceChainId,
    Number(gasPrice) || 0.00001,
    Math.max(Number(gasLimit) || 2500, 2500),
    Math.round(new Date().getTime() / 1000) - 50,
    28800,
  );

  const privateKey =
    signature.length === 128 && isPrivateKey(signature)
      ? signature.slice(0, 64)
      : signature.length === 64
      ? signature
      : null;

  try {
    await Pact.fetch.local(
      {
        keyPairs: [],
        pactCode: `(at 'interfaces (describe-module "${token || 'coin'}"))`,
        meta: Pact.lang.mkMeta(
          'not-real',
          sourceChainId,
          0.00001,
          2500,
          Math.round(new Date().getTime() / 1000) - 50,
          600,
        ),
      },
      getPactHost(network, version, instance, sourceChainId, customHost),
    );
  } catch (e) {}

  const keyPair = [
    {
      publicKey,
      secretKey: privateKey,
      clist: [
        {name: 'coin.GAS', args: []},
        {
          name: `${token || 'coin'}.TRANSFER`,
          args: [sender, receiver, Number(amount)],
        },
      ],
    },
  ];

  const pactCode = `(${token || 'coin'}.transfer-create ${JSON.stringify(
    sender,
  )} ${JSON.stringify(receiver)} (read-keyset "ks")  ${convertDecimal(
    amount,
  )})`;

  if (!receiverPublicKey) {
    try {
      const receiverInfoResponse = await getAccount({
        network,
        instance,
        version,
        chainId: sourceChainId,
        accountName: receiver,
        customHost,
      });
      if (!receiverInfoResponse) {
        if (receiver.startsWith('k:') && receiver.length === 66) {
          const createdCommand = Pact.simple.exec.createCommand(
            keyPair,
            getNonceByPlatform(Platform.OS),
            pactCode,
            {
              ks: {
                pred: predicate || 'keys-all',
                keys: [receiver.slice(2)],
              },
            },
            meta,
            instance,
          );
          return setSignatureIfNecessary(createdCommand, signature);
        } else {
          throw new Error(
            'Receiving account does not exist. You must specify a keyset to create this account.',
          );
        }
      } else {
        const createdCommand = Pact.simple.exec.createCommand(
          keyPair,
          getNonceByPlatform(Platform.OS),
          pactCode,
          {
            ks: {
              pred: predicate || 'keys-all',
              keys: [receiverInfoResponse.publicKey],
            },
          },
          meta,
          instance,
        );
        return setSignatureIfNecessary(createdCommand, signature);
      }
    } catch (e) {
      if (receiver.startsWith('k:') && receiver.length === 66) {
        const createdCommand = Pact.simple.exec.createCommand(
          keyPair,
          getNonceByPlatform(Platform.OS),
          pactCode,
          {
            ks: {
              pred: predicate || 'keys-all',
              keys: [receiver.slice(2)],
            },
          },
          meta,
          instance,
        );
        return setSignatureIfNecessary(createdCommand, signature);
      } else {
        throw new Error(
          'Receiving account does not exist. You must specify a keyset to create this account.',
        );
      }
    }
  } else {
    const createdCommand = Pact.simple.exec.createCommand(
      keyPair,
      getNonceByPlatform(Platform.OS),
      pactCode,
      {
        ks: {
          pred: predicate || 'keys-all',
          keys: [receiverPublicKey || ''],
        },
      },
      meta,
      instance,
    );
    return setSignatureIfNecessary(createdCommand, signature);
  }
};
