import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import ReactNativeBiometrics, {BiometryType} from 'react-native-biometrics';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import FaceIdSvg from '../../assets/images/face-id.svg';
import FingerIdSvg from '../../assets/images/finger-id.svg';
import {
  createKeys,
  getAvailableSensor,
  keyExist,
} from '../../utils/biometricHelpers';
import {TNumpadProps} from './types';
import {numpadNums, pinCodeLengthArr} from './const';
import {
  makeSelectNewPinCode,
  makeSelectPinCode,
} from '../../store/auth/selectors';
import {login, setNewPinCode, storePinCode} from '../../store/auth';
import {useNavigation} from '@react-navigation/native';
import {ERootStackRoutes} from '../../routes/types';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {isAllCharactersSame} from '../../utils/stringHelpers';

const Numpad: FC<TNumpadProps> = ({isReset}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const storedPinCode = useSelector(makeSelectPinCode);
  const newPinCode = useSelector(makeSelectNewPinCode);

  const [biometryType, setBiometryType] = useState<BiometryType | null>(null);
  const [pinCode, setPinCode] = useState('');

  const [translateAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const animateBounce = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactHeavy', {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateAnimation, {
          toValue: 8,
          duration: 30,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(translateAnimation, {
          toValue: 0,
          duration: 30,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(translateAnimation, {
          toValue: -8,
          duration: 30,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(translateAnimation, {
          toValue: 0,
          duration: 30,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: 3,
      },
    ).start();
  }, []);

  const pinCodeLength = useMemo(() => pinCode?.length || 0, [pinCode]);

  const handlePressNumber = useCallback(
    (num: number) => () => {
      ReactNativeHapticFeedback.trigger('impactMedium', {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: false,
      });
      setPinCode(prevPinCode => prevPinCode + num);
    },
    [],
  );

  const navigateToHome = useCallback(() => {
    navigation.navigate(ERootStackRoutes.Home);
  }, [navigation]);

  const auth = useCallback(() => {
    dispatch(login());
  }, [dispatch]);

  const promptBiometricAuth = useCallback(
    (noRedirect?: boolean) => {
      ReactNativeBiometrics.simplePrompt({promptMessage: 'Authentication'})
        .then(resultObject => {
          const {success} = resultObject;
          if (!noRedirect && success) {
            auth();
          }
        })
        .catch(() => {});
    },
    [auth],
  );

  const handlePressBiometricAuth = useCallback(() => {
    keyExist().then(isKeyExist => {
      if (isKeyExist) {
        promptBiometricAuth(!storedPinCode || isReset);
      } else {
        createKeys().then(() => {
          promptBiometricAuth(!storedPinCode || isReset);
        });
      }
    });
  }, [promptBiometricAuth, storedPinCode, isReset]);

  const handleAvailableSensor = useCallback(() => {
    getAvailableSensor().then(sensor => {
      setBiometryType(sensor);
    });
  }, []);

  const generatePinCode = useCallback(() => {
    if (newPinCode) {
      if (newPinCode === pinCode) {
        isReset ? navigateToHome() : auth();
        dispatch(storePinCode(pinCode));
        dispatch(setNewPinCode(null));
      }
    } else {
      if (
        !isAllCharactersSame(pinCode) &&
        pinCode.substring(0, 2) !== pinCode.substring(2, 4)
      ) {
        dispatch(setNewPinCode(pinCode));
      } else {
        Alert.alert(
          'Weak passcode',
          'Entered passcode is too week. Please try more complex passcode',
        );
      }
    }
  }, [newPinCode, pinCode, isReset, auth, navigateToHome]);

  const validatePinCode = useCallback(() => {
    if (!storedPinCode || isReset) {
      generatePinCode();
    }

    if (pinCode === storedPinCode) {
      auth();
    } else {
      animateBounce();
    }
    setPinCode('');
  }, [pinCode, auth, isReset, animateBounce, storedPinCode, generatePinCode]);

  useEffect(() => {
    handleAvailableSensor();
    setPinCode('');
  }, [handleAvailableSensor]);

  useEffect(() => {
    if (pinCodeLength === 4) {
      validatePinCode();
    }
  }, [validatePinCode, pinCodeLength]);

  useEffect(() => {
    if (!isReset && !biometryType) {
      keyExist().then(isKeyExist => {
        if (isKeyExist) {
          if (storedPinCode && !isReset) {
            promptBiometricAuth();
          }
        } else {
          createKeys().then(() => {
            promptBiometricAuth(!storedPinCode || isReset);
          });
        }
      });
    }
  }, [storedPinCode, isReset, promptBiometricAuth, biometryType]);

  return (
    <Animated.View
      style={[
        styles.bodyWrapper,
        {
          transform: [{translateX: translateAnimation}],
        },
      ]}>
      <View style={styles.smallCirclesWrapper}>
        {pinCodeLengthArr.map(num => (
          <View
            key={num}
            style={[
              styles.smallCircle,
              {backgroundColor: pinCodeLength >= num ? 'white' : undefined},
            ]}
          />
        ))}
      </View>
      <View style={styles.numpadWrapper}>
        {numpadNums.map(num => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={num}
            onPress={handlePressNumber(num)}
            style={styles.numberWrapper}>
            <Text style={styles.number}>{num}</Text>
          </TouchableOpacity>
        ))}
        {!biometryType ? (
          <View style={[styles.numberWrapper, styles.noBorder]} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.numberWrapper, styles.noBorder]}
            onPress={handlePressBiometricAuth}>
            {biometryType === ReactNativeBiometrics.FaceID ? (
              <FaceIdSvg width="40" height="40" />
            ) : biometryType === ReactNativeBiometrics.TouchID ||
              biometryType === ReactNativeBiometrics.Biometrics ? (
              <FingerIdSvg width="56" height="56" />
            ) : null}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePressNumber(0)}
          style={styles.numberWrapper}>
          <Text style={styles.number}>0</Text>
        </TouchableOpacity>
        <View style={[styles.numberWrapper, styles.noBorder]} />
      </View>
    </Animated.View>
  );
};

export default Numpad;
