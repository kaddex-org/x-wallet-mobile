import {TNetwork} from '../../screens/Networks/components/Item/types';

export const GET_NETWORK_DETAILS_REQUEST = 'GET_NETWORK_DETAILS_REQUEST';

export const getNetworkDetails = (payload: TNetwork) => ({
  type: GET_NETWORK_DETAILS_REQUEST,
  payload,
});
