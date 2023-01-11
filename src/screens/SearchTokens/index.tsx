import React, {useCallback, useMemo, useState} from 'react';
import {View, TextInput, Text, Alert, FlatList} from 'react-native';

import Header from './components/Header';
import BasicSearchSvg from '../../assets/images/basic-search.svg';
import Item from './components/Item';
import {styles} from './styles';
import {makeSelectSearchTokenList} from '../../store/userWallet/selectors';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import {getNetworkParams} from '../../utils/networkHelpers';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {makeSelectActiveNetworkDetails} from '../../store/networks/selectors';
import {useShallowEqualSelector} from '../../store/utils';
import {useNavigation} from '@react-navigation/native';
import {setSelectedToken} from '../../store/userWallet';
import {useDispatch} from 'react-redux';
import {getPact} from '../../api/kadena/pact';

const SearchTokens = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.SearchTokens>>();

  const dispatch = useDispatch();

  const networkDetail = useShallowEqualSelector(makeSelectActiveNetworkDetails);
  const tokensList = useShallowEqualSelector(makeSelectSearchTokenList);

  const [search, setSearch] = useState('');
  const filteredList = tokensList.filter((item: string) =>
    item?.includes(search),
  );
  const [loadingItem, setLoadingItem] = useState<string>('');

  const handlePressItem = useCallback(
    (item: string) => async () => {
      if (networkDetail) {
        setLoadingItem(item);
        getPact({
          ...networkDetail,
          ...getNetworkParams(networkDetail),
          chainId: '2',
          pactCode: `(let ((moduleDesc (describe-module "${item}")))
                            (contains "fungible-v2"
                              (if (contains 'interfaces moduleDesc)
                                (at 'interfaces moduleDesc)
                                []
                                )))`,
        })
          .then(responseData => {
            if (responseData === true) {
              dispatch(setSelectedToken(null));
              navigation.replace(ERootStackRoutes.AddToken, {
                tokenName: item,
              } as any);
            } else {
              ReactNativeHapticFeedback.trigger('impactMedium', {
                enableVibrateFallback: false,
                ignoreAndroidSystemSettings: false,
              });
              Alert.alert(
                'Not fungible token',
                'Selected token is not fungible',
              );
            }
          })
          .catch(() => {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Alert.alert('Not fungible token', 'Selected token is not fungible');
          })
          .finally(() => {
            setLoadingItem('');
          });
      }
    },
    [networkDetail, navigation],
  );

  const renderItem = useCallback(
    ({item, index}: any) => (
      <Item
        key={item}
        item={item}
        loadingItem={loadingItem}
        onPress={handlePressItem(item)}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((key: any) => key, []);

  const emptyView = useMemo(
    () => <Text style={styles.emptyList}>No tokens found</Text>,
    [],
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={styles.searchSection}>
          <BasicSearchSvg />
          <TextInput
            style={styles.input}
            placeholder="Search token"
            value={search}
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus={false}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          style={styles.contactsWrapper}
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={emptyView}
          contentContainerStyle={styles.contactsContent}
        />
      </View>
    </View>
  );
};

export default SearchTokens;
