import React, {FC} from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {TItemProps} from './types';
import {MAIN_COLOR} from '../../../../constants/styles';

const Item: FC<TItemProps> = React.memo(({item, loadingItem, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}>
      <Text style={styles.text}>{item}</Text>
      {item === loadingItem ? (
        <ActivityIndicator size="small" color={MAIN_COLOR} />
      ) : null}
    </TouchableOpacity>
  );
});

export default Item;
