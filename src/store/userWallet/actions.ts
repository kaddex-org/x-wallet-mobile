import {
  TAccountImportRequest,
  TBalancesRequest,
  TGenAccountParams,
  TRestoreAccountParams,
  TSearchTokenListParams,
} from './types';

export const GET_BALANCES_REQUEST = 'GET_BALANCES_REQUEST';
export const GET_GENERATE_ACCOUNT_REQUEST = 'GET_GENERATE_ACCOUNT_REQUEST';
export const GET_IMPORT_ACCOUNT_REQUEST = 'GET_IMPORT_ACCOUNT_REQUEST';
export const GET_RESTORE_ACCOUNT = 'GET_RESTORE_ACCOUNT';
export const GET_TOKEN_LIST = 'GET_TOKEN_LIST';

export const getBalances = (payload: TBalancesRequest) => ({
  type: GET_BALANCES_REQUEST,
  payload,
});

export const getGenerateAccount = (payload?: TGenAccountParams) => ({
  type: GET_GENERATE_ACCOUNT_REQUEST,
  payload: payload || null,
});

export const getImportAccount = (payload: TAccountImportRequest) => ({
  type: GET_IMPORT_ACCOUNT_REQUEST,
  payload,
});

export const getRestoreAccount = (payload: TRestoreAccountParams) => ({
  type: GET_RESTORE_ACCOUNT,
  payload,
});

export const getTokenList = (payload: TSearchTokenListParams) => ({
  type: GET_TOKEN_LIST,
  payload,
});
