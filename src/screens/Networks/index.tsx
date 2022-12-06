import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';

import Header from './components/Header';
import Item from './components/Item';
import NetworkDetailsModal from '../../modals/NetworkDetailsModal';
import {makeSelectNetworksList} from '../../store/networks/selectors';
import {styles} from './styles';
import {setSelectedNetwork} from '../../store/networks';
import {TNetwork} from './components/Item/types';
import {useShallowEqualSelector} from '../../store/utils';

const Networks = () => {
  const dispatch = useDispatch();

  const networksList = useShallowEqualSelector(makeSelectNetworksList);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const handlePressItem = useCallback(
    (item: TNetwork) => () => {
      toggleModal();
      dispatch(setSelectedNetwork(item));
    },
    [toggleModal],
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contactsWrapper}
          contentContainerStyle={styles.contactsContent}>
          {networksList.map((item: TNetwork) => (
            <Item item={item} key={item.id} onPress={handlePressItem(item)} />
          ))}
        </ScrollView>
      </View>
      <NetworkDetailsModal isVisible={isModalVisible} toggle={toggleModal} />
    </View>
  );
};

export default Networks;
