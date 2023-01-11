import {DefaultQueryParams} from '../types';
import {getKeyPairsFromSeedPhrase} from '../../utils/kadenaHelpers';
import {Pact} from '../pactLangApi';
import {getPactHost} from '../utils';
import UserService from '../firebase/users';

interface AccountGenQueryParams extends DefaultQueryParams {
  accountName: string;
  privateKey?: string;
  seeds?: string;
  accountIndex?: number;
  instance: string;
  version: string;
  chainId: string;
  customHost?: string | undefined | null;
}

export interface AccountGenResponseData {
  accountName: string;
  publicKey: string;
  privateKey?: string;
}

export const getAccount: (
  params: AccountGenQueryParams,
) => Promise<AccountGenResponseData> = async ({
  customHost,
  privateKey,
  seeds,
  accountIndex,
  accountName,
  network,
  instance,
  version,
  chainId,
}) => {
  if (
    !network ||
    !version ||
    !instance ||
    chainId === undefined ||
    !accountName
  ) {
    throw new Error('Wrong Parameters: request getAccount');
  }
  let publicCodeFromRequest: any;
  if (privateKey) {
    const {publicKey: publicCodeFromPact} =
      Pact.crypto.restoreKeyPairFromSecretKey(privateKey.slice(0, 64));
    publicCodeFromRequest = publicCodeFromPact;
  }
  if (!publicCodeFromRequest && seeds) {
    const {publicKey: publicCodeFromPact} = getKeyPairsFromSeedPhrase(
      seeds,
      Number(accountIndex || 0),
    );
    publicCodeFromRequest = publicCodeFromPact;
  }

  const isDeleted = await UserService.checkUserDeleted(publicCodeFromRequest);
  if (isDeleted) {
    throw new Error('Account is deleted. Please create a new account');
  }

  const createTime = () => Math.round(new Date().getTime() / 1000) - 60;
  const detailsResponse = await Pact.fetch.local(
    {
      pactCode: `(coin.details ${JSON.stringify(accountName)})`,
      keyParis: [],
      meta: Pact.lang.mkMeta(
        'not-real',
        chainId,
        0.00001,
        2500,
        createTime(),
        600,
      ),
    },
    getPactHost(network, version, instance, chainId, customHost),
  );
  if (
    typeof detailsResponse === 'string' ||
    detailsResponse instanceof String
  ) {
    throw new Error(
      'Account does not exist. Private Key is wrong or try to make transfer first.',
    );
  }

  if (detailsResponse.result.status !== 'failure') {
    if (detailsResponse.result.data.guard.keysetref) {
      const keySetResponse = await Pact.fetch.local(
        {
          pactCode: `(describe-keyset ${JSON.stringify(
            detailsResponse.result.data.guard.keysetref,
          )})`,
          meta: Pact.lang.mkMeta('', '', 0.00001, 2500, createTime(), 28800),
        },
        getPactHost(network, version, instance, chainId, customHost),
      );
      const publicKey = keySetResponse.result.data.keys[0];
      if (!privateKey || publicCodeFromRequest === publicKey) {
        return {
          accountName,
          publicKey,
          privateKey,
        };
      } else {
        throw new Error(
          'Account does not exist. Private Key is wrong or try to make transfer first.',
        );
      }
    }
    if (detailsResponse.result.data.guard.keys) {
      const publicKey = detailsResponse.result.data.guard.keys[0];
      if (!privateKey || publicCodeFromRequest === publicKey) {
        return {
          accountName,
          publicKey,
          privateKey,
        };
      } else {
        throw new Error(
          'Account does not exist. Private Key is wrong or try to make transfer first.',
        );
      }
    }
    if (
      'fun' in detailsResponse.result.data.guard &&
      'args' in detailsResponse.result.data.guard
    ) {
      const guardFun = detailsResponse.result.data.guard.fun;
      const [ksRef, afterDateFun] = detailsResponse.result.data.guard.args;
      if (
        guardFun === 'util.guards.enforce-and' &&
        'keysetref' in ksRef &&
        afterDateFun.fun === 'util.guards.enforce-after-date'
      ) {
        const keySetResponse = await Pact.fetch.local(
          {
            pactCode: `(describe-keyset ${JSON.stringify(ksRef.keysetref)})`,
            meta: Pact.lang.mkMeta('', '', 0.00001, 2500, createTime(), 28800),
          },
          getPactHost(network, version, instance, chainId, customHost),
        );
        const publicKey = keySetResponse.result.data.keys[0];
        if (!privateKey || publicCodeFromRequest === publicKey) {
          return {
            accountName,
            publicKey,
            privateKey,
          };
        } else {
          throw new Error(
            'Account does not exist. Private Key is wrong or try to make transfer first.',
          );
        }
      }
    }
  } else if (
    detailsResponse.result.error.message.slice(0, 24) ===
    'with-read: row not found'
  ) {
    throw new Error(
      'Account does not exist. Private Key is wrong or try to make transfer first.',
    );
  }
  throw new Error(
    'Account Guard is not conventional. Please use a different tool.',
  );
};
