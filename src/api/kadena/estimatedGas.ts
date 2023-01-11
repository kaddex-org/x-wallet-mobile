import {switchBetweenConfig} from '../utils';
import {APIRemoteRoute, DefaultQueryParams} from '../types';
import axios from 'axios';
import {
  defaultHeader,
  MAIN_NETWORK_API_URL,
  TEST_NETWORK_API_URL,
} from '../constants';

interface EstimatedGasQueryParams extends DefaultQueryParams {
  requestKey: string;
  customHost?: string | null;
}

export const getEstimatedGas: (
  params: EstimatedGasQueryParams,
) => Promise<any> = async ({customHost, network, requestKey}) => {
  if (!requestKey || !network) {
    throw new Error('Wrong Parameters: request getGas');
  }

  return await switchBetweenConfig(
    network,
    async () => {
      const testNetConfigResponse = await axios.get(
        `${TEST_NETWORK_API_URL}${APIRemoteRoute.Txs}${APIRemoteRoute.Txs}`,
        {
          params: {
            requestkey: requestKey,
          },
          headers: defaultHeader,
        },
      );
      const gasPrice = testNetConfigResponse.data?.gasPrice || '0';
      const gas = testNetConfigResponse.data?.gas || '0';
      const estimatedGasFee = Number(gasPrice) * Number(gas);
      return {
        gasFee: estimatedGasFee,
        gasPrice,
        gas,
      };
    },
    async () => {
      const mainNetConfigResponse = await axios.get(
        `${MAIN_NETWORK_API_URL}${APIRemoteRoute.Txs}${APIRemoteRoute.Txs}`,
        {
          params: {
            requestkey: requestKey,
          },
          headers: defaultHeader,
        },
      );
      const gasPrice = mainNetConfigResponse.data?.gasPrice || '0';
      const gas = mainNetConfigResponse.data?.gas || '0';
      const estimatedGasFee = Number(gasPrice) * Number(gas);
      return {
        gasFee: estimatedGasFee,
        gasPrice,
        gas,
      };
    },
    async () => {
      if (customHost) {
        const mainNetConfigResponse = await axios.get(
          `${customHost}${APIRemoteRoute.Txs}${APIRemoteRoute.Txs}`,
          {
            params: {
              requestkey: requestKey,
            },
            headers: defaultHeader,
          },
        );
        const gasPrice = mainNetConfigResponse.data?.gasPrice || '0';
        const gas = mainNetConfigResponse.data?.gas || '0';
        const estimatedGasFee = Number(gasPrice) * Number(gas);
        return {
          gasFee: estimatedGasFee,
          gasPrice,
          gas,
        };
      } else {
        throw new Error('Wrong Parameters: request getGas');
      }
    },
  );
};
