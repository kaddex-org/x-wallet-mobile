import React, {useCallback, useMemo} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';
import SecurityUnlockSvg from '../../assets/images/security-unlock.svg';
import Numpad from '../../components/Numpad';
import {useSelector} from 'react-redux';
import {
  makeSelectNewPinCode,
  makeSelectPinCode,
} from '../../store/auth/selectors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ERootStackRoutes,
  TNavigationProp,
  TNavigationRouteProp,
} from '../../routes/types';

const bgImage = require('../../assets/images/bgimage.png');

const Login = () => {
  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Login>>();
  const route = useRoute<TNavigationRouteProp<ERootStackRoutes.Login>>();

  const isReset = Boolean(route?.params?.isReset);

  const storedPinCode = useSelector(makeSelectPinCode);
  const newPinCode = useSelector(makeSelectNewPinCode);

  const title = useMemo(
    () =>
      !isReset && storedPinCode
        ? 'Unlock X-Wallet'
        : newPinCode
        ? isReset
          ? 'Re-enter new passcode'
          : 'Re-enter your passcode'
        : isReset
        ? 'Enter new passcode'
        : 'Enter your passcode',
    [isReset, storedPinCode, newPinCode],
  );

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
      <View style={styles.contentWrapper}>
        <View style={styles.unlockWrapper}>
          <SecurityUnlockSvg fill="white" width={32} height={32} />
        </View>
        <Text style={styles.unlockText}>{title}</Text>
        <View style={styles.bodyWrapper}>
          <Numpad isReset={isReset} />
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePressBack}>
          <ArrowLeftSvg fill="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
