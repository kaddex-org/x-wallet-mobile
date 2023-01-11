import {Pact} from '../pactLangApi';
import {KADDEX_NAMESPACE} from '../constants';
import {getPactHost} from '../utils';
import {getSignatureFromHash, isPrivateKey} from '../../utils/kadenaHelpers';
import {Platform} from 'react-native';

interface SendQueryParams extends DefaultQueryParams {
  instance: string;
  version: string;
  chainId: string;
  customHost?: string | null;
  publicKey: string;
  signature: string;
  token0Amount: number;
  token1Amount: number;
  token0Address: string;
  token1Address: string;
  token0AmountWithSlippage: number;
  token1AmountWithSlippage: number;
  gasStationEnabled?: boolean;
  gasPrice?: number;
  gasLimit?: number;
  ttl?: number;
  accountName: string;
  isSwapIn: boolean;
}

const getNonceByPlatform = (platform?: 'macos' | 'ios' | 'android') => {
  switch (platform) {
    case 'macos':
      return `"XMS-${new Date().toISOString()}"`;
    case 'ios':
      return `"XIS-${new Date().toISOString()}"`;
    case 'android':
      return `"XAS-${new Date().toISOString()}"`;
    default:
      return `"${new Date().toISOString()}"`;
  }
};
const creationTime = () => Math.round(new Date().getTime() / 1000) - 10;
const getPairAccount = async (token0: string, token1: string, host: string) => {
  const data = await Pact.fetch.local(
    {
      pactCode: `(${KADDEX_NAMESPACE}.exchange.get-pair ${token0} ${token1})`,
      keyPairs: Pact.crypto.genKeyPair(),
      meta: Pact.lang.mkMeta('', '2', 0.0000001, 150000, creationTime(), 600),
    },
    host,
  );
  if (data.result.status === 'success') {
    return data.result.data;
  }
  return null;
};
const getTokenBalanceAccount = async (
  tokenAddress: string,
  account: string,
  host: string,
) => {
  if (account) {
    return Pact.fetch.local(
      {
        pactCode: `(${tokenAddress}.details ${JSON.stringify(account)})`,
        meta: Pact.lang.mkMeta('', '2', 0.0000001, 150000, creationTime(), 600),
      },
      host,
    );
  }
  return {result: {status: 'failure'}};
};

export const getSwap: (params: SendQueryParams) => Promise<any> = async ({
  customHost,
  network,
  instance,
  chainId,
  version,
  publicKey,
  signature,
  token0Address,
  token1Address,
  token0Amount,
  token1Amount,
  token0AmountWithSlippage,
  token1AmountWithSlippage,
  gasStationEnabled,
  gasLimit,
  gasPrice,
  ttl,
  accountName,
  isSwapIn,
}) => {
  if (
    !instance ||
    !network ||
    !version ||
    !publicKey ||
    !signature ||
    chainId === undefined ||
    !token0Amount ||
    !token1Amount ||
    !token0Address ||
    !token1Address ||
    !accountName
  ) {
    throw new Error('Wrong Parameters: request getSwap');
  }
  const accountDetails = await getTokenBalanceAccount(
    token0Address,
    accountName,
    getPactHost(network, version, instance, '2', customHost),
  );
  if (accountDetails.result.status === 'success') {
    const pair = await getPairAccount(
      token0Address,
      token1Address,
      getPactHost(network, version, instance, '2', customHost),
    );

    const inPactCode = `(${KADDEX_NAMESPACE}.exchange.swap-exact-in
              (read-decimal 'token0Amount)
              (read-decimal 'token1AmountWithSlippage)
              [${token0Address} ${token1Address}]
              ${JSON.stringify(accountName)}
              ${JSON.stringify(accountName)}
              (read-keyset 'user-ks)
            )`;
    const outPactCode = `(${KADDEX_NAMESPACE}.exchange.swap-exact-out
              (read-decimal 'token1Amount)
              (read-decimal 'token0AmountWithSlippage)
              [${token0Address} ${token1Address}]
              ${JSON.stringify(accountName)}
              ${JSON.stringify(accountName)}
              (read-keyset 'user-ks)
            )`;

    const cmd = {
      pactCode: isSwapIn ? inPactCode : outPactCode,
      caps: [
        gasStationEnabled
          ? Pact.lang.mkCap(
              'Gas Station',
              'free gas',
              `${KADDEX_NAMESPACE}.gas-station.GAS_PAYER`,
              ['kaddex-free-gas', {int: 1}, 1.0],
            )
          : Pact.lang.mkCap('gas', 'pay gas', 'coin.GAS'),
        Pact.lang.mkCap(
          'transfer capability',
          'transfer token in',
          `${token0Address}.TRANSFER`,
          [
            accountName,
            pair.account,
            isSwapIn ? +token0Amount : +token0AmountWithSlippage,
          ],
        ),
      ],
      sender: gasStationEnabled ? 'kaddex-free-gas' : accountName,
      gasLimit: Number(gasLimit) || 10000,
      gasPrice: Number(gasPrice) || 0.000001,
      ttl: Number(ttl) || 600,
      chainId,
      envData: {
        'user-ks': accountDetails.result.data.guard,
        token0Amount: +token0Amount,
        token1Amount: +token1Amount,
        token0AmountWithSlippage: +token0AmountWithSlippage,
        token1AmountWithSlippage: +token1AmountWithSlippage,
      },
      signingPubKey: accountDetails.result.data.guard.keys[0],
      networkId: instance,
      networkVersion: version,
    };

    const meta = Pact.lang.mkMeta(
      cmd.sender,
      cmd.chainId.toString(),
      cmd.gasPrice,
      cmd.gasLimit,
      Math.round(new Date().getTime() / 1000) - 50,
      cmd.ttl,
    );
    const clist = cmd.caps ? cmd.caps.map((c: any) => c.cap) : [];
    const privateKey =
      signature.length === 128 && isPrivateKey(signature)
        ? signature.slice(0, 64)
        : signature.length === 64
        ? signature
        : null;
    const keyPairs: any = {
      publicKey,
      secretKey: privateKey,
    };
    if (clist.length > 0) {
      keyPairs.clist = clist;
    }
    const signedCmd = Pact.api.prepareExecCmd(
      keyPairs,
      getNonceByPlatform(Platform.OS),
      cmd.pactCode,
      cmd.envData,
      meta,
      cmd.networkId,
    );
    if (signature.length > 64) {
      const sig = getSignatureFromHash(signedCmd.hash, signature);
      signedCmd.sigs = [{sig}];
    }

    const resultResponse = await fetch(
      `${getPactHost(
        network,
        version,
        instance,
        chainId,
        customHost,
      )}/api/v1/send`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          cmds: [signedCmd],
        }),
      },
    );

    return await resultResponse.json();
  } else {
    throw new Error('Wrong Parameters: request getSwap');
  }
};
