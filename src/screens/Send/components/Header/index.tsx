import React, {FC, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ArrowLeftSvg from '../../../../assets/images/arrow-left.svg';
import {styles} from './styles';
import {makeSelectSelectedToken} from '../../../../store/userWallet/selectors';
import {useShallowEqualSelector} from '../../../../store/utils';
import {ERootStackRoutes, TNavigationProp} from '../../../../routes/types';

const Header: FC = React.memo(() => {
  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Send>>();
  const selectedToken = useShallowEqualSelector(makeSelectSelectedToken);

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
      <Text style={styles.title}>{`Send${
        selectedToken?.tokenName ? ` ${selectedToken?.tokenName}` : ''
      } Transaction`}</Text>
    </View>
  );
});

export default Header;
