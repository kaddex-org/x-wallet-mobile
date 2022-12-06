import React, {useCallback} from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';

import Card from './components/Card';
import Footer from './components/Footer';

import ContactsSvg from '../../assets/images/contacts.svg';
import NetworksSvg from '../../assets/images/networks.svg';
import ShieldLockSvg from '../../assets/images/shield-lock.svg';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';

import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {deleteAccount, logout} from '../../store/auth/actions';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Home>>();

  const dispatch = useDispatch();

  const handlePressContacts = useCallback(() => {
    navigation.navigate({
      name: ERootStackRoutes.Contacts,
      params: undefined,
    });
  }, [navigation]);

  const handlePressNetworks = useCallback(() => {
    navigation.navigate({
      name: ERootStackRoutes.Networks,
      params: undefined,
    });
  }, [navigation]);

  const handlePressWalletConnect = useCallback(() => {
    navigation.navigate({
      name: ERootStackRoutes.WalletConnectSettings,
      params: undefined,
    });
  }, [navigation]);

  const handlePressSignOut = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    Alert.alert(
      'Are you sure to lock wallet?',
      'All history data will remain',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Lock Wallet',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
          },
        },
      ],
    );
  }, []);

  const handlePressDelete = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    Alert.alert(
      'Are you sure to delete account?',
      'All account data will be deleted and can not be restored',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteAccount());
          },
        },
      ],
    );
  }, []);

  const handlePressAccountSecurity = useCallback(() => {
    navigation.navigate({
      name: ERootStackRoutes.SettingsSubPage,
      params: undefined,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.contentWrapper}>
        <Card
          title="Contacts"
          text="Manage your contact list"
          icon={<ContactsSvg width={24} height={24} fill="white" />}
          isFirstItem
          onPress={handlePressContacts}
        />
        <Card
          title="Networks"
          text="Add or edit custom RPC networks"
          icon={<NetworksSvg width={24} height={24} fill="white" />}
          onPress={handlePressNetworks}
        />
        <Card
          title="WalletConnect"
          text="Edit WalletConnect config"
          icon={
            <Image
              source={require('../../assets/images/walletConnect.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          }
          onPress={handlePressWalletConnect}
        />
        <Card
          title="Account Security"
          text="Manage your account wallet security"
          icon={<ShieldLockSvg width={24} height={24} fill="white" />}
          onPress={handlePressAccountSecurity}
        />
        <Card
          title="Lock Wallet"
          text="All history data will remain"
          onPress={handlePressSignOut}
        />
        <Footer />
        <Card
          title="Delete Account"
          titleStyle={{color: 'red'}}
          text="All account data will be deleted"
          onPress={handlePressDelete}
        />
      </ScrollView>
    </View>
  );
};

export default Settings;
