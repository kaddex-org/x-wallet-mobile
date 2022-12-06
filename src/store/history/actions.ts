import {TPollRequestParams} from './types';

export const GET_POLL_REQUEST = 'GET_POLL_REQUEST';

export const getPollRequest = (payload: TPollRequestParams[]) => ({
  type: GET_POLL_REQUEST,
  payload,
});
