import {createSlice} from '@reduxjs/toolkit';

import {THistoryState, TPollResp, TPollRespItem} from './types';
import {defaultRequestValues} from '../const';

const initialState: THistoryState = {
  activities: [],
  pollReqState: defaultRequestValues,
};

const history = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setGetPollLoading: (state, {payload}) => {
      state.pollReqState.fetching = payload;
    },
    setGetPollSuccess: (state, {payload}) => {
      state.pollReqState.data = payload;
      const activities: TPollRespItem[] = payload.reduce(
        (acc: TPollRespItem[], obj: TPollResp) => [
          ...acc,
          ...Object.values(obj),
        ],
        [],
      );
      const length = (state.activities || []).length;
      for (let i = 0; i < length; i++) {
        const item = activities.find(
          activity => activity.reqKey === state.activities[i].requestKey,
        );
        if (item) {
          state.activities[i] = {
            ...state.activities[i],
            status: item?.result?.error?.message?.includes(
              'resumePact: pact completed:',
            )
              ? 'success'
              : item.result.status,
            ...item,
          };
        }
      }
    },
    setGetPollError: (state, {payload}) => {
      state.pollReqState.error = payload;
    },
    setSendResult: (state, {payload}) => {
      const foundIndex = (state.activities || []).findIndex(
        item =>
          item.requestKey === payload.sourceRequestKey ||
          item.requestKey === payload.requestKey,
      );
      if (foundIndex > -1) {
        state.activities[foundIndex] = payload;
      } else {
        state.activities = (state.activities || []).concat([payload]);
      }
      state.activities = state.activities.filter(
        (item, pos, self) =>
          self.findIndex(subItem => subItem.requestKey === item.requestKey) ===
          pos,
      );
    },
    replaceSendResult: (state, {payload}) => {
      const foundIndex = (state.activities || []).findIndex(
        item =>
          item.requestKey === payload.sourceRequestKey ||
          item.requestKey === payload.requestKey,
      );
      if (foundIndex > -1) {
        state.activities[foundIndex] = payload;
      }
    },
    setListenResult: (state, {payload}) => {
      (state.activities || []).forEach(activity => {
        if (activity.requestKey === payload?.requestKey) {
          activity.status =
            payload?.result?.status === 'success' ||
            payload?.result?.error?.message?.includes(
              'resumePact: pact completed:',
            )
              ? 'success'
              : payload?.result?.status === 'failure'
              ? 'failure'
              : 'pending';
        }
      });
    },

    setInitialHistoryState: state => {
      state.pollReqState = initialState.pollReqState;
      state.activities = initialState.activities;
    },
  },
});

export const {
  setGetPollError,
  setGetPollLoading,
  setGetPollSuccess,
  setSendResult,
  replaceSendResult,
  setListenResult,
  setInitialHistoryState,
} = history.actions;

export default history.reducer;
