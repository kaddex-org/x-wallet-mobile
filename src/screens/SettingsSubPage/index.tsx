import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import ArrowLeftSvg from '../../assets/images/arrow-left.svg';
import ShieldLockSvg from '../../assets/images/shield-lock.svg';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import Card from '../Settings/components/Card';
import {styles} from './styles';

const SettingsSubPage = () => {
  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Home>>();

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePressBack}
          style={styles.backBtnWrapper}>
          <ArrowLeftSvg fill="#787B8E" />
        </TouchableOpacity>
        <Text style={styles.title}>Account Security</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.content}>
        <Card
          isFirstItem={true}
          title="Reset Passcode"
          text="Change app passcode"
          icon={<ShieldLockSvg width={24} height={24} fill="white" />}
          onPress={() => {
            navigation.navigate({
              name: ERootStackRoutes.ResetPasscode,
              params: {isReset: true},
            });
          }}
        />
        <Card
          title="Export Recovery Phrase"
          text="Protect your wallet"
          icon={<ShieldLockSvg width={24} height={24} fill="white" />}
          onPress={() =>
            navigation.navigate({
              name: ERootStackRoutes.ExportRecoveryPhraseAuth,
              params: undefined,
            })
          }
        />
        <Card
          title="Change Password"
          text="Change Account Password"
          icon={<ShieldLockSvg width={24} height={24} fill="white" />}
          onPress={() =>
            navigation.navigate({
              name: ERootStackRoutes.ChangeAccountPassword,
              params: undefined,
            })
          }
        />
        <Card
          title="2-Factor Authentication"
          text="Manage 2-Factor Authentication"
          icon={<ShieldLockSvg width={24} height={24} fill="white" />}
          onPress={() =>
            navigation.navigate({
              name: ERootStackRoutes.Add2FA,
              params: undefined,
            })
          }
        />
      </ScrollView>
    </View>
  );
};

export default SettingsSubPage;
