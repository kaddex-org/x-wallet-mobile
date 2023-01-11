// @ts-ignore
import lib from 'cardano-crypto.js/kadena-crypto';
import {Pact} from '../api/pactLangApi';
import {Buffer} from 'buffer';

export const generateSeedPhrase = () => {
  return lib.kadenaGenMnemonic();
};

export const checkValidSeedPhrase = (seedPhrase: string) => {
  return lib.kadenaCheckMnemonic(seedPhrase);
};

export const initKadenaHelpers = () => {
  const seeds = generateSeedPhrase();
  getKeyPairsFromSeedPhrase(seeds, 0);
};

export function isPrivateKey(sig: string) {
  if (!sig) {
    return false;
  }
  if (sig.length === 64) {
    return true;
  }
  const secretKey: string = sig.slice(0, 64);
  const publicKey: string = sig.slice(64);
  const restored: any = Pact.crypto.restoreKeyPairFromSecretKey(secretKey);
  return restored.secretKey === secretKey && restored.publicKey === publicKey;
}

const getKeyPairsFromSeedPhraseHelper = (seedPhrase: string, index: number) => {
  const root = lib.kadenaMnemonicToRootKeypair('', seedPhrase);
  const hardIndex = 0x80000000;
  const newIndex = hardIndex + index;
  const [privateRaw, pubRaw] = lib.kadenaGenKeypair('', root, newIndex);
  const axprv = new Uint8Array(privateRaw);
  const axpub = new Uint8Array(pubRaw);
  const pub = Pact.crypto.binToHex(axpub);
  const prv = Pact.crypto.binToHex(axprv);
  return {
    publicKey: pub as unknown as string,
    secretKey: prv as unknown as string,
  };
};

export const getKeyPairsFromSeedPhrase = (
  seedPhrase: string,
  index: number,
) => {
  for (let retries = 0; ; retries++) {
    try {
      return getKeyPairsFromSeedPhraseHelper(seedPhrase, index);
    } catch (e) {
      if (retries < 2) {
        continue;
      } else {
        throw e;
      }
    }
  }
};

export const getSignatureFromHash = (hash: string, privateKey: string) => {
  const newHash = Buffer.from(hash, 'base64');
  const u8PrivateKey = Pact.crypto.hexToBin(privateKey);
  const signature = lib.kadenaSign('', newHash, u8PrivateKey);
  const s = new Uint8Array(signature);
  return Pact.crypto.binToHex(s);
};

export function setSignatureIfNecessary(cmdValue: any, sig: string) {
  if (!sig || !cmdValue) {
    throw new Error('Wrong Parameters: request getSignature');
  }
  if (sig.length === 64) {
    return cmdValue;
  }
  if (sig.length === 128 && isPrivateKey(sig)) {
    return cmdValue;
  }
  if (sig.length > 64) {
    const cmdHash = cmdValue.cmds[0].hash;
    const signature = getSignatureFromHash(cmdHash, sig);
    return {
      cmds: [
        {
          ...cmdValue.cmds[0],
          sigs: [{sig: signature}],
        },
      ],
    };
  }
  return cmdValue;
}
