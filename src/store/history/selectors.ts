import {createSelector} from '@reduxjs/toolkit';
import moment from 'moment';

import {RootState} from '../store';
import {TActivity, TPollRequestParams} from './types';
import {getNetworkParams} from '../../utils/networkHelpers';
import {TListDayItem} from '../../screens/History/components/ListDay/types';
import {TListItem} from '../../screens/History/components/ListItem/types';
import {TAccount} from '../userWallet/types';

const convertToListDay = (activities: TActivity[]) => {
  const daysObj: Record<string, TListItem[]> = {};
  activities.forEach(activity => {
    const date = moment(activity.createdTime);
    const day = date.format('MMMM D');
    if (!(day in daysObj)) {
      daysObj[day] = [];
    }
    daysObj[day].push({
      title: activity.requestKey,
      time: date.format('yyyy-MM-DD HH:mm:ss'),
      ...activity,
    });
  });
  const resp: TListDayItem[] = Object.entries(daysObj).map(([key, value]) => ({
    day: key,
    list: value,
  }));

  return resp;
};

const getPendingActivities = (activities: TActivity[]) =>
  activities.filter(({status}) => status === 'pending');

const selectedState = (state: RootState) => state.history;

const selectedNetworkDetails = (state: RootState) =>
  state.networks.activeNetworkState.data;

export const makeSelectPollLoading = createSelector(selectedState, state => {
  const {pollReqState} = state;
  return !!pollReqState.fetching;
});

export const makeSelectPollRequestParams = createSelector(
  selectedState,
  selectedNetworkDetails,
  (state, network) => {
    if (!network) {
      return [];
    }

    const chainIdsObj: Record<string, TActivity[]> = {};

    state.activities.forEach(activity => {
      const {sourceChainId, targetChainId} = activity;
      if (!(targetChainId in chainIdsObj)) {
        chainIdsObj[targetChainId] = [];
      }
      chainIdsObj[targetChainId].push(activity);
      if (!(sourceChainId in chainIdsObj)) {
        chainIdsObj[sourceChainId] = [];
      }
      chainIdsObj[sourceChainId].push(activity);
    });

    const reqParamsList: TPollRequestParams[] = Object.entries(chainIdsObj).map(
      ([chainId, list]) => ({
        chainId,
        requestKeys: list.map(({requestKey}) => requestKey),
        instance: network.instance,
        version: network.version,
        ...getNetworkParams(network),
      }),
    );

    return reqParamsList;
  },
);

export const makeSelectListDayActivities = createSelector(
  selectedState,
  state => {
    return convertToListDay([...state.activities].reverse());
  },
);

export const makeSelectListDayPendingActivities = createSelector(
  selectedState,
  state => {
    const pendingActivities = getPendingActivities(
      [...state.activities].reverse(),
    );

    return convertToListDay(pendingActivities);
  },
);

export const makeSelectRecentReceivers = createSelector(selectedState, state =>
  (state.activities || [])
    .map(
      (activity: TActivity) =>
        ({
          chainId: activity.targetChainId,
          accountName: activity.receiver,
        } as TAccount),
    )
    .filter(
      (item, pos, self) =>
        !!item.accountName &&
        self.findIndex(subItem => subItem.accountName === item.accountName) ===
          pos,
    ),
);
