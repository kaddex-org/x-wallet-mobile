import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

const selectedState = (state: RootState) => state.networks;

export const makeSelectNetworksList = createSelector(
  selectedState,
  state => state.networksList,
);

export const makeSelectSelectedNetwork = createSelector(
  selectedState,
  state => state.selectedNetwork,
);

export const makeSelectActiveNetwork = createSelector(
  selectedState,
  state => state.activeNetwork,
);

export const makeSelectActiveNetworkDetails = createSelector(
  selectedState,
  state => state.activeNetworkState?.data,
);

export const makeSelectNetworkDetailsLoading = createSelector(
  selectedState,
  state => state.activeNetworkState.fetching,
);
