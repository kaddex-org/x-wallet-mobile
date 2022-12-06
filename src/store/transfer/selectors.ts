import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

const selectedState = (state: RootState) => state.transfers;

export const makeSelectGatheredInfo = createSelector(
  selectedState,
  state => state.gatheredTransferInfo,
);

export const makeSelectIsCrossChainTransfer = createSelector(
  selectedState,
  state => {
    const {chainId, destinationAccount} = state.gatheredTransferInfo;
    return chainId !== destinationAccount?.chainId;
  },
);

export const makeSelectTransferResult = createSelector(
  selectedState,
  state => state.transferResult,
);

export const makeSelectShowTransferBubble = createSelector(
  selectedState,
  state => !!state.showTransferBubble,
);

export const makeSelectEstimatedGasFee = createSelector(
  selectedState,
  state => state.estimatedGasFee,
);

export const makeSelectIsSwapping = createSelector(
  selectedState,
  state => state.isSwapping,
);
