import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';

import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import ListItem from './components/ListItem';
import {makeSelectSelectedAccount} from '../../store/userWallet/selectors';
import {useShallowEqualSelector} from '../../store/utils';
import {setIs2FaAdded} from '../../store/auth';
import {
  makeSelectGeneratedPhrases,
  makeSelectIs2FaAdded,
} from '../../store/auth/selectors';
import {MAIN_COLOR} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';
import api from '../../api';
import FooterButton from '../../components/FooterButton';
import Input from '../../components/Input';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';
import {styles} from './styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const Add2FA = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const seeds = useSelector(makeSelectGeneratedPhrases);
  const is2FaAdded = useSelector(makeSelectIs2FaAdded);
  const account = useShallowEqualSelector(makeSelectSelectedAccount);

  const [isVerifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secretCode, setSecretCode] = useState('');

  const generateQrCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const {data} = await api.post('/api/2fa/generate', {
        secretRecovery: seeds,
      });
      setQrCodeUrl(data.url);
      setSecretCode(data.secret);
    } catch (e) {
      Toast.show({
        type: 'error',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        text1: 'Something Went Wrong',
        text2: 'Please try again',
        topOffset: statusBarHeight + 16,
      });
    } finally {
      setIsLoading(false);
    }
  }, [seeds]);

  useEffect(() => {
    generateQrCode();
  }, [generateQrCode]);

  const handleVerifySuccessRes = useCallback(() => {
    Toast.show({
      type: 'success',
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      text1: 'You have successfully added 2FA',
      text2: '2FA is now enabled',
      topOffset: statusBarHeight + 16,
    });
    dispatch(setIs2FaAdded(true));
    navigation.goBack();
  }, [navigation]);

  const handleVerifyErrorRes = useCallback(() => {
    Toast.show({
      type: 'error',
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      text1: 'Verification code is incorrect',
      text2: 'Please try again',
      topOffset: statusBarHeight + 16,
    });
    setCode('');
  }, []);

  const verifyCode = useCallback(async () => {
    setVerifying(true);
    try {
      const {data} = await api.post('/api/2fa/verify', {
        secret: code,
        secretRecovery: seeds,
      });

      setVerifying(false);
      switch (data.status) {
        case 'success':
          handleVerifySuccessRes();
          return;
        case 'code is incorrect':
          handleVerifyErrorRes();
          return;
      }
    } catch (e) {
      setVerifying(false);
    }
  }, [seeds, code, handleVerifyErrorRes, handleVerifySuccessRes]);

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const deactivate = useCallback(async () => {
    const {data} = await api.post('api/2fa/deactivate', {
      secretRecovery: seeds,
    });

    if (data.status === 'success') {
      dispatch(setIs2FaAdded(false));
    }
  }, [seeds]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePressBack}
          style={styles.backBtnWrapper}>
          <ArrowLeftSvg fill="#787B8E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2-Factor Authentication</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        style={styles.scroll}
        contentContainerStyle={styles.content}>
        {!is2FaAdded && (isVerifying || isLoading) ? (
          <View style={styles.loadingWrapper}>
            <View style={styles.loading}>
              <ActivityIndicator color={MAIN_COLOR} size="small" />
            </View>
            <Text style={styles.loadingText}>
              {isVerifying ? 'Verifying...' : isLoading ? 'Loading...' : ''}
            </Text>
          </View>
        ) : null}
        {!is2FaAdded ? (
          <>
            <Text style={styles.text}>
              After installing the Google Authenticator, scan QR code below and
              enter the verification code
            </Text>
            {qrCodeUrl ? (
              <Image
                source={{
                  uri: qrCodeUrl,
                }}
                style={styles.qrCode}
              />
            ) : null}
            <View style={styles.block}>
              {secretCode.length ? (
                <ListItem text={secretCode} title="Secret key" />
              ) : null}
            </View>
          </>
        ) : (
          <Text style={styles.text}>
            2-Factor Authentication is enabled with Google Authenticator
          </Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        {is2FaAdded ? null : (
          <Input
            label="Verification code"
            placeholder="Enter Code"
            autoCapitalize="none"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            wrapperStyle={styles.inputWrapper}
          />
        )}
        <FooterButton
          disabled={!is2FaAdded && code.length !== 6}
          style={styles.footerBtn}
          title={is2FaAdded ? 'DISABLE ' : 'VERIFY CODE'}
          onPress={is2FaAdded ? deactivate : verifyCode}
        />
      </View>
      {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-bottomSpace} />}
    </View>
  );
};

export default Add2FA;
