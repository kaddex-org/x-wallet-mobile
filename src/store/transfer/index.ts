import {createSlice} from '@reduxjs/toolkit';

import {EGAsSpeed, TTransferState} from './types';
import {GAS_LIMIT, GAS_PRICE} from '../../constants';

const initialState: TTransferState = {
  gatheredTransferInfo: {amount: 0},
  transferResult: null,
  isSwapping: false,
  showTransferBubble: false,
  estimatedGasFee: {
    gasLimit: GAS_LIMIT,
    gasPrice: GAS_PRICE,
    speed: EGAsSpeed.NORMAL,
  },
};

const transfer = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setGatheredTransferInfo: (state, {payload}) => {
      state.gatheredTransferInfo = {...state.gatheredTransferInfo, ...payload};
    },

    setTransferResult: (state, {payload}) => {
      state.transferResult = payload;
    },

    setTransferBubble: (state, {payload}) => {
      state.showTransferBubble = payload;
    },

    setEstimatedGasFee: (state, {payload}) => {
      state.estimatedGasFee = payload;
    },

    setInitialTransferState: state => {
      state.estimatedGasFee = initialState.estimatedGasFee;
      state.gatheredTransferInfo = initialState.gatheredTransferInfo;
      state.transferResult = initialState.transferResult;
    },

    swapRequestPending: state => {
      state.isSwapping = true;
    },

    swapRequestFulfilled: state => {
      state.isSwapping = false;
    },
    swapRequestError: state => {
      state.isSwapping = false;
    },
  },
});

export const {
  setTransferBubble,
  setGatheredTransferInfo,
  setTransferResult,
  setEstimatedGasFee,
  setInitialTransferState,
  swapRequestPending,
  swapRequestFulfilled,
  swapRequestError,
} = transfer.actions;

export default transfer.reducer;
