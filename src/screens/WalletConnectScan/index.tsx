import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from './components/Header';
import {styles} from './styles';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {signClient} from '../../utils/walletConnect';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import FooterButton from '../../components/FooterButton';
import {bottomSpace} from '../../utils/deviceHelpers';
import {useNavigation} from '@react-navigation/native';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';

const WalletConnectScan = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.WalletConnectScan>>();

  const [hasPermission, setHasPermission] = useState(false);
  const [textUri, setTexTUri] = useState<string>(
    'wc:e3a9269dfc0e8eca426b10be4eb6422edc771a7a57057dbfe60ea07509154124@2?relay-protocol=irn&symKey=56c62c552d3a6cd5b2a3edf96194b42fb8e758b80bffd3bac85df964c88f40b6',
  );

  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    if (
      barcodes &&
      Array.isArray(barcodes) &&
      barcodes.length > 0 &&
      barcodes[0].rawValue
    ) {
      if (!textUri || textUri !== barcodes[0].rawValue) {
        setTexTUri(barcodes[0].rawValue);
      }
    }
  }, [navigation, barcodes, textUri]);

  const onProceed = useCallback(async () => {
    if (textUri && signClient) {
      try {
        await signClient?.pair({uri: textUri});
      } catch (e) {
      } finally {
        navigation.goBack();
      }
    }
  }, [navigation, textUri]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const cameraView = useMemo(() => {
    return device != null && hasPermission ? (
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
    ) : (
      <View style={styles.camera} />
    );
  }, [device, hasPermission]);

  return (
    <View style={styles.screen}>
      <Header />
      <TouchableOpacity
        activeOpacity={1}
        onPress={Keyboard.dismiss}
        style={styles.container}>
        {cameraView}
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                autoFocus={false}
                placeholder="Type connection code"
                value={textUri}
                onChangeText={setTexTUri}
              />
            </View>
          </View>
          <FooterButton
            style={styles.footerButton}
            title="Connect"
            disabled={!textUri}
            onPress={onProceed}
          />
          {Platform.OS === 'ios' && (
            <KeyboardSpacer topSpacing={-bottomSpace} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WalletConnectScan;
