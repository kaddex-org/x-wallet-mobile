import React, {useCallback, useEffect} from 'react';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Card from './components/Card';
import Logo from '../../assets/images/logo.svg';
import UserSvg from '../../assets/images/user.svg';
import CircleArrowRightSvg from '../../assets/images/circle-arrow-right.svg';
import CircleArrowRightGreenSvg from '../../assets/images/circle-arrow-right-green.svg';
import {styles} from './styles';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import {
  makeSelectHashPassword,
  makeSelectPinCode,
} from '../../store/auth/selectors';
import {useNavigation} from '@react-navigation/native';

const bgImage = require('../../assets/images/bgimage.png');

const Welcome = () => {
  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Welcome>>();

  const storedPinCode = useSelector(makeSelectPinCode);
  const storedPasswordHash = useSelector(makeSelectHashPassword);

  const navigateTo = useCallback(
    (route: any) => () => {
      navigation.navigate(route);
    },
    [navigation],
  );

  useEffect(() => {
    if (storedPinCode) {
      navigation.navigate({
        name: ERootStackRoutes.Login,
        params: {
          isReset: false,
        },
      });
    } else if (storedPasswordHash) {
      navigation.navigate({
        name: ERootStackRoutes.SignIn,
        params: undefined,
      });
    }
  }, []);

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <Logo />
          <Text style={styles.welcome}>{'Welcome to\nX-Wallet'}</Text>
          <Text style={styles.smText}>The evolution of DeFi on Kadena</Text>
          <View style={styles.cards}>
            {storedPasswordHash ? (
              <Card
                title="Login to my account"
                description="Enter your wallet password"
                icon={<CircleArrowRightGreenSvg />}
                onPress={navigateTo(ERootStackRoutes.SignIn)}
              />
            ) : null}
            <Card
              title="I’m a new user"
              description="Setup new X-Wallet account"
              icon={<UserSvg />}
              onPress={navigateTo(ERootStackRoutes.Registration)}
            />
            <Card
              title="I have an account"
              description="Login with your secret phrase"
              icon={<CircleArrowRightSvg />}
              onPress={navigateTo(ERootStackRoutes.RecoveryFromSeeds)}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Welcome;
