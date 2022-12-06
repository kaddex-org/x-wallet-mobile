import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import NetworksSvg from '../../../../assets/images/networks.svg';
import LockSvg from '../../../../assets/images/lock.svg';
import ChevronRightSvg from '../../../../assets/images/chevron-right.svg';
import {styles} from './styles';
import {TItemProps} from './types';
import {MAIN_COLOR} from '../../../../constants/styles';

const Item: FC<TItemProps> = React.memo(({item, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}>
      <View style={styles.iconWrapper}>
        <NetworksSvg fill={MAIN_COLOR} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.rightWrapper}>
          <LockSvg />
          <ChevronRightSvg fill="#787B8E" />
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default Item;
