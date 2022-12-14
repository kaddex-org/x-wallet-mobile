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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import FooterButton from '../../components/FooterButton';
import {bottomSpace} from '../../utils/deviceHelpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ERootStackRoutes,
  TNavigationProp,
  TNavigationRouteProp,
} from '../../routes/types';

const ReceiverScan = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.ReceiverScan>>();
  const route = useRoute<TNavigationRouteProp<ERootStackRoutes.ReceiverScan>>();

  const [hasPermission, setHasPermission] = useState(false);
  const [textUri, setTexTUri] = useState<string>('');

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
    if (textUri && route?.params?.onScan) {
      route?.params?.onScan(textUri);
      navigation.goBack();
    }
  }, [navigation, textUri, route?.params]);

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
                placeholder="Edit destination account"
                value={textUri}
                onChangeText={setTexTUri}
              />
            </View>
          </View>
          <FooterButton
            style={styles.footerButton}
            title="Confirm"
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

export default ReceiverScan;
