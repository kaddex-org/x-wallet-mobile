import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, RefreshControl, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';

import Header from './components/Header';
import ListDay from './components/ListDay';

import {styles} from './styles';
import {
  makeSelectListDayActivities,
  makeSelectListDayPendingActivities,
  makeSelectPollLoading,
  makeSelectPollRequestParams,
} from '../../store/history/selectors';
import {getPollRequest} from '../../store/history/actions';
import {headerTabs} from './const';
import {useShallowEqualSelector} from '../../store/utils';

const History = () => {
  const dispatch = useDispatch();

  const pollReqParams = useShallowEqualSelector(makeSelectPollRequestParams);
  const isPollingRequests = useShallowEqualSelector(makeSelectPollLoading);
  const listDayActivities = useShallowEqualSelector(
    makeSelectListDayActivities,
  );
  const listDayPendingActivities = useShallowEqualSelector(
    makeSelectListDayPendingActivities,
  );

  const [activeTab, setActiveTab] = useState(headerTabs[0].value);

  const isPendingTab = useMemo(() => activeTab === 'pending', [activeTab]);

  useEffect(() => {
    pollReqParams && dispatch(getPollRequest(pollReqParams));
  }, []);

  const onRefresh = useCallback(() => {
    pollReqParams && dispatch(getPollRequest(pollReqParams));
  }, [pollReqParams]);

  const renderItem = useCallback(({item}) => <ListDay item={item} />, []);

  const keyExtractor = useCallback(item => {
    return `${item.day}-${(item.list || []).map(
      (subItem: any) => subItem.txId || subItem.requestKey,
    )}`;
  }, []);

  return (
    <View style={styles.container}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isPollingRequests}
            onRefresh={onRefresh}
          />
        }
        data={isPendingTab ? listDayPendingActivities : listDayActivities}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            {isPendingTab ? 'No pending activities' : 'No activities found'}
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.contentWrapper}
      />
    </View>
  );
};

export default History;
