import {
  TFinishTransferRequest,
  TMakeTransferRequest,
  TSwapRequest,
} from './types';

export const MAKE_TRANSFER_REQUEST = 'MAKE_TRANSFER_REQUEST';
export const FINISH_TRANSFER_REQUEST = 'FINISH_TRANSFER_REQUEST';
export const SWAP_REQUEST = 'SWAP_REQUEST';

export const makeTransfer = (payload: TMakeTransferRequest) => ({
  type: MAKE_TRANSFER_REQUEST,
  payload,
});

export const finishTransfer = (payload: TFinishTransferRequest) => ({
  type: FINISH_TRANSFER_REQUEST,
  payload,
});

export const swapRequest = (payload: TSwapRequest) => ({
  type: SWAP_REQUEST,
  payload,
});
