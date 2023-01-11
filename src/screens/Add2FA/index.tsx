import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import ListItem from './components/ListItem';
import {setIs2FaAdded} from '../../store/auth';
import {makeSelectIs2FaAdded} from '../../store/auth/selectors';
import {MAIN_COLOR} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';
import FooterButton from '../../components/FooterButton';
import Input from '../../components/Input';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';
import {styles} from './styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {deactivate2FA, generate2FA, verify2FA} from '../../api/2fa';
import {makeSelectSelectedAccountPublicKey} from '../../store/userWallet/selectors';

const windowWidth = Dimensions.get('window').width;

const Add2FA = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const selectedAccountPublicKey = useSelector(
    makeSelectSelectedAccountPublicKey,
  );
  const is2FaAdded = useSelector(makeSelectIs2FaAdded);

  const [isVerifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secretCode, setSecretCode] = useState('');

  const generateQrCode = useCallback(async () => {
    setIsLoading(true);
    try {
      if (selectedAccountPublicKey) {
        const data = await generate2FA(selectedAccountPublicKey);
        setQrCodeUrl(data.url);
        setSecretCode(data.secret);
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          visibilityTime: 4000,
          autoHide: true,
          text1: 'Something Went Wrong',
          text2: 'Please try again',
          topOffset: statusBarHeight + 16,
        });
      }
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
  }, [selectedAccountPublicKey]);

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
      if (selectedAccountPublicKey) {
        const status = await verify2FA(selectedAccountPublicKey, code);
        setVerifying(false);
        switch (status) {
          case 'success':
            handleVerifySuccessRes();
            return;
          case 'code is incorrect':
            handleVerifyErrorRes();
            return;
        }
      } else {
        setVerifying(false);
      }
    } catch (e) {
      setVerifying(false);
    }
  }, [
    selectedAccountPublicKey,
    code,
    handleVerifyErrorRes,
    handleVerifySuccessRes,
  ]);

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const deactivate = useCallback(async () => {
    if (selectedAccountPublicKey) {
      const status = await deactivate2FA(selectedAccountPublicKey);
      if (status === 'success') {
        dispatch(setIs2FaAdded(false));
      }
    }
  }, [selectedAccountPublicKey]);

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
              <View style={styles.qrCode}>
                <QRCode size={windowWidth - 40} value={qrCodeUrl} />
              </View>
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
