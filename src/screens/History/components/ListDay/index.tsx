import React, {FC, useCallback, useState} from 'react';
import {View, Text} from 'react-native';

import ListItem from '../ListItem';
import TransactionDetailsModal from '../../../../modals/TransactionDetailsModal';
import {TListDayProps} from './types';
import {styles} from './styles';

const ListDay: FC<TListDayProps> = React.memo(({item}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleModal = useCallback(
    (activity?: any) => {
      if (selectedItem) {
        setIsVisible(false);
        setTimeout(() => setSelectedItem(null), 150);
      } else {
        setSelectedItem(activity);
        setIsVisible(true);
      }
    },
    [selectedItem],
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{item.day}</Text>
      {item.list.map((listItem, index) => (
        <ListItem
          item={listItem as any}
          key={index}
          onPress={() => toggleModal(listItem)}
        />
      ))}
      <TransactionDetailsModal
        details={selectedItem}
        isVisible={!!selectedItem && isVisible}
        toggle={toggleModal}
      />
    </View>
  );
});

export default ListDay;
