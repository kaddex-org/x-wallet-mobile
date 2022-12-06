import {TGetTransferContParams, TGetTransferParams} from './types';
import api from '../../api';
import {TReserveResponse} from '../../contexts/Pact/types';

export const getCrossTransferRequest = (params: TGetTransferParams) => {
  return api
    .get('/api/transfer-cross', {params})
    .then(resp => {
      return resp;
    })
    .catch(err => {
      return err;
    });
};

export const getSimpleTransferRequest = (params: TGetTransferParams) => {
  return api.get('/api/transfer-single', {params}).then(resp => {
    return resp;
  });
};

export const getContinuationTransferRequest = (
  params: TGetTransferContParams,
) => {
  return api.get('/api/transfer-continuation', {params}).then(resp => {
    return resp;
  });
};

export const getSpvRequest = (queryParams: string) => {
  return api.get(`api/spv?${queryParams}`).then(resp => {
    return resp;
  });
};

export const getSendRequest = (queryParams: string) => {
  return api.get(`/api/send?${queryParams}`).then(resp => {
    return resp;
  });
};

export const swapApiRequest = (queryParams: string) => {
  return api.get(`/api/swap?${queryParams}`).then(res => {
    return res;
  });
};

export const pactApiRequest = (queryParams: string) => {
  return api.get<TReserveResponse[]>(`/api/pact?${queryParams}`).then(res => {
    return res;
  });
};

export const getListenRequest = (queryParams: string) => {
  return api.get(`/api/listen?${queryParams}`).then(resp => {
    return resp;
  });
};

export const getPollRequest = (queryParams: string) => {
  return api.get(`/api/poll?${queryParams}`).then(resp => {
    return resp;
  });
};

export const getSignRequest = (queryParams: string) => {
  return api.get(`/api/sign?${queryParams}`).then(resp => {
    return resp;
  });
};
