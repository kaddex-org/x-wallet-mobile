import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import ArrowLeftSvg from '../../../../assets/images/arrow-left.svg';
import {ERootStackRoutes, TNavigationProp} from '../../../../routes/types';

const Header = React.memo(() => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.SendSummary>>();

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePressBack}
        style={styles.backBtnWrapper}>
        <ArrowLeftSvg fill="#787B8E" />
      </TouchableOpacity>
      <Text style={styles.title}>Send Transaction</Text>
    </View>
  );
});

export default Header;
