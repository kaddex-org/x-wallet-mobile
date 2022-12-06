import {createSlice} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import {TNetworksState} from './types';
import {defaultNetworksList} from '../../screens/Networks/consts';
import {defaultRequestValues} from '../const';

const initialState: TNetworksState = {
  networksList: defaultNetworksList,
  selectedNetwork: null,
  activeNetwork: defaultNetworksList[0],
  activeNetworkState: defaultRequestValues,
};

const networks = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    setSelectedNetwork: (state, {payload}) => {
      state.selectedNetwork = payload;
    },
    setActiveNetwork: (state, {payload}) => {
      state.activeNetwork = payload;
    },

    createNetwork: (state, {payload}) => {
      const id = uuid.v4().slice(0, 13) as string;
      state.networksList.unshift({id, ...payload});
    },

    updateSelectedNetwork: (state, {payload}) => {
      const selectedNetworkId = state.selectedNetwork?.id;
      const idx = state.networksList.findIndex(
        ({id}) => id === selectedNetworkId,
      );
      if (idx !== -1) {
        state.networksList[idx] = {id: selectedNetworkId, ...payload};
      }
    },

    deleteSelectedNetwork: state => {
      state.networksList = state.networksList.filter(
        ({id}) => id !== state.selectedNetwork?.id,
      );
    },

    setNetworkDetailsLoading: (state, action) => {
      state.activeNetworkState.fetching = action.payload;
    },
    setNetworkDetailsSuccess: (state, action) => {
      state.activeNetworkState.data = action.payload;
    },
    setNetworkDetailsError: (state, action) => {
      state.activeNetworkState.error = action.payload;
    },

    setInitialNetworkState: state => {
      state.networksList = initialState.networksList;
      state.activeNetworkState = initialState.activeNetworkState;
      state.activeNetwork = initialState.activeNetwork;
      state.selectedNetwork = initialState.selectedNetwork;
    },
  },
});

export const {
  setSelectedNetwork,
  setActiveNetwork,
  createNetwork,
  updateSelectedNetwork,
  deleteSelectedNetwork,
  setNetworkDetailsError,
  setNetworkDetailsLoading,
  setNetworkDetailsSuccess,
  setInitialNetworkState,
} = networks.actions;

export default networks.reducer;
