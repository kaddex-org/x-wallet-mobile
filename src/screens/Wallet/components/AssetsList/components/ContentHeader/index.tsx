import React, {FC, useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OutlineSearchSvg from '../../../../../../assets/images/outline-search.svg';
import CirclePlus from '../../../../../../assets/images/circle-plus.svg';
import {
  ERootStackRoutes,
  TNavigationProp,
} from '../../../../../../routes/types';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {setSelectedToken} from '../../../../../../store/userWallet';

const ContentHeader: FC = React.memo(() => {
  const dispatch = useDispatch();

  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Home>>();

  const handlePressSearch = useCallback(() => {
    dispatch(setSelectedToken(null));
    setTimeout(
      () =>
        navigation.navigate({
          name: ERootStackRoutes.SearchTokens,
          params: undefined,
        }),
      150,
    );
  }, [navigation]);

  const handlePressPlus = useCallback(() => {
    dispatch(setSelectedToken(null));
    setTimeout(
      () =>
        navigation.navigate({
          name: ERootStackRoutes.AddToken,
          params: {
            tokenName: undefined,
          },
        }),
      150,
    );
  }, [navigation]);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Assets</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePressSearch}
          style={styles.plusSvgWrapper}>
          <OutlineSearchSvg />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePressPlus}
          style={styles.plusSvgWrapper}>
          <CirclePlus />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ContentHeader;
