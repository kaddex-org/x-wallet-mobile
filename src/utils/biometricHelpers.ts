import ReactNativeBiometrics from 'react-native-biometrics';

export const getAvailableSensor = () => {
  return ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;
    if (
      available &&
      (biometryType === ReactNativeBiometrics.TouchID ||
        biometryType === ReactNativeBiometrics.FaceID ||
        biometryType === ReactNativeBiometrics.Biometrics)
    ) {
      return biometryType;
    } else {
      return null;
    }
  });
};

export const keyExist = () => {
  return ReactNativeBiometrics.biometricKeysExist()
    .then(resultObject => {
      const {keysExist} = resultObject;
      return keysExist;
    })
    .catch(() => Promise.reject());
};

export const createKeys = () => {
  return ReactNativeBiometrics.createKeys()
    .then(resultObject => {
      const {publicKey} = resultObject;
      return publicKey;
    })
    .catch(() => Promise.reject());
};
