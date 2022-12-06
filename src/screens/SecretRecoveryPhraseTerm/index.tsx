import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Logo from '../../assets/images/logo.svg';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';

import {styles} from './styles';
import Checkbox from '../../components/Checkbox';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import {useNavigation} from '@react-navigation/native';

const bgImage = require('../../assets/images/bgimage.png');

const SecretRecoveryPhraseTerm = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.SecretRecoveryPhraseTerm>>();

  const [isChecked, setChecked] = useState(false);

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePressContinue = useCallback(() => {
    navigation.navigate({
      name: ERootStackRoutes.SecretRecoveryPhrase,
      params: undefined,
    });
  }, [navigation]);

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
        contentContainerStyle={styles.content}>
        <Logo width={50} height={50} />
        <Text style={styles.title}>Secret Recovery Phrase</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.text}>
            In the next step you will record your 12 word recovery phrase.
          </Text>
          <Text style={styles.text}>
            Your recovery phrase makes it easy to restore your wallet on a new
            device.
          </Text>
          <Text style={styles.text}>
            Anyone with this phrase can take control of your wallet, keep this
            phrase private.
          </Text>
          <Text style={styles.text}>
            Kadena cannot access your recovery phrase if lost or if app is
            deleted, please store it safely.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.checkBoxWrapper}>
          <Checkbox
            isChecked={isChecked}
            onPress={setChecked}
            textStyle={styles.checkBoxText}
            iconStyle={styles.checkBoxIcon}
            style={styles.checkBox}
            text="I understand that if I lose my recovery phrase, I will not be able to restore my wallet."
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isChecked}
          style={[styles.button, !isChecked && styles.disabledBtn]}
          onPress={handlePressContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePressBack}>
          <ArrowLeftSvg fill="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SecretRecoveryPhraseTerm;
