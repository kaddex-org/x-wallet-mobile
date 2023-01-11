import {Pact} from '../pactLangApi';
import {
  checkValidSeedPhrase,
  getKeyPairsFromSeedPhrase,
} from '../../utils/kadenaHelpers';

interface AccountGenQueryParams {
  accountName?: string;
  seeds?: string;
  accountIndex?: number;
}

export interface AccountGenResponseData {
  accountName: string;
  publicKey: string;
  privateKey: string;
}

export const generateAccount: (
  params: AccountGenQueryParams,
) => Promise<AccountGenResponseData> = async ({
  seeds,
  accountName,
  accountIndex,
}) => {
  if (!seeds || seeds.length === 0) {
    const keyPair = Pact.crypto.genKeyPair();
    return {
      accountName: accountName || `k:${keyPair.publicKey}`,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.secretKey,
    };
  } else if (checkValidSeedPhrase(seeds)) {
    const keyPair = getKeyPairsFromSeedPhrase(seeds, Number(accountIndex || 0));
    return {
      accountName: accountName || `k:${keyPair.publicKey}`,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.secretKey,
    };
  } else {
    throw new Error('Invalid Secret Recovery Phrase');
  }
};
