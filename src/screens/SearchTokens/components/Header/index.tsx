import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import ArrowLeftSvg from '../../../../assets/images/arrow-left.svg';
import CirclePlusSvg from '../../../../assets/images/circle-plus.svg';
import {ERootStackRoutes, TNavigationProp} from '../../../../routes/types';
import {setSelectedToken} from '../../../../store/userWallet';
import {useDispatch} from 'react-redux';

const Header = React.memo(() => {
  const dispatch = useDispatch();

  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.SearchTokens>>();

  const handlePressCreate = useCallback(() => {
    dispatch(setSelectedToken(null));
    setTimeout(
      () =>
        navigation.navigate({
          name: ERootStackRoutes.AddToken,
          params: {tokenName: undefined},
        }),
      150,
    );
  }, [navigation]);

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
      <Text style={styles.title}>Search Token</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.rightItemWrapper}
        onPress={handlePressCreate}>
        <CirclePlusSvg />
      </TouchableOpacity>
    </View>
  );
});

export default Header;
