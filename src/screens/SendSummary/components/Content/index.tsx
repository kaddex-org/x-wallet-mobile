import React from 'react';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';

import Settings from '../Settings';
import {styles} from './styles';
import {makeSelectEstimatedGasFee} from '../../../../store/transfer/selectors';
import {useShallowEqualSelector} from '../../../../store/utils';

const Content = React.memo(() => {
  const estimatedGas = useShallowEqualSelector(makeSelectEstimatedGasFee);
  const {gasLimit, gasPrice, speed} = estimatedGas;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={styles.contentWrapper}>
      <View style={styles.header}>
        <Text style={[styles.text, styles.headerTitle]}>
          Transaction Parameters
        </Text>
        <Settings />
      </View>
      <View style={styles.itemWrapper}>
        <View style={styles.item}>
          <Text style={[styles.text, styles.kda]}>
            {(Number(gasLimit * gasPrice) || 0).toFixed(8)}
          </Text>
          <Text style={[styles.text, styles.usd]}>{'Gas'}</Text>
        </View>
        <Text style={[styles.text, styles.leftText]}>{`${speed} Speed`}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default Content;
