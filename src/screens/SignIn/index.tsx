import React, {useCallback, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Logo from '../../assets/images/logo.svg';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';

import {styles} from './styles';
import PasswordInput from '../../components/PasswordInput';
import {signInPasswordSchema} from '../../validation/signInPasswordSchema';
import {login} from '../../store/auth';
import {makeSelectHashPassword} from '../../store/auth/selectors';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import {useScrollBottomOnKeyboard} from '../../utils/keyboardHelpers';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import queryString from 'query-string';
import api from '../../api';
import {useNavigation} from '@react-navigation/native';
import {bottomSpace} from '../../utils/deviceHelpers';

const bgImage = require('../../assets/images/bgimage.png');

const SignIn = () => {
  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.SignIn>>();

  const dispatch = useDispatch();

  const hash = useSelector(makeSelectHashPassword);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: signInPasswordSchema});

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const showSuccessAlert = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    Alert.alert(
      'Use passcode Login to sign in?',
      'Would you like to use passcode and biometrics to access X-Wallet?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            dispatch(login());
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate({
              name: ERootStackRoutes.Login,
              params: {
                isReset: false,
              },
            });
          },
        },
      ],
    );
  }, [navigation]);

  const handlePressSignIn = useCallback(
    (data: FieldValues) => {
      api
        .get(
          `/api/compare-password?${queryString.stringify({
            password: data.password || '',
            hash,
          })}`,
        )
        .then(compareResponse => {
          if (compareResponse.data) {
            showSuccessAlert();
          } else {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Alert.alert('Failed to login', 'Invalid password');
          }
        })
        .catch(() => {
          ReactNativeHapticFeedback.trigger('impactMedium', {
            enableVibrateFallback: false,
            ignoreAndroidSystemSettings: false,
          });
          Alert.alert(
            'Failed to login',
            'Something went wrong. Please try again later.',
          );
        });
    },
    [showSuccessAlert, hash],
  );

  const scrollRef = useRef<ScrollView | null>(null);
  useScrollBottomOnKeyboard(scrollRef);

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
        contentContainerStyle={styles.content}>
        <Logo width={50} height={50} />
        <Text style={styles.text}>Welcome</Text>
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <PasswordInput
              autoFocus={true}
              label="Password"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              blurOnSubmit={true}
              wrapperStyle={styles.password}
              errorMessage={errors.password?.message as string}
              onSubmitEditing={handleSubmit(handlePressSignIn)}
            />
          )}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleSubmit(handlePressSignIn)}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-bottomSpace} />}
      </ScrollView>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePressBack}>
          <ArrowLeftSvg fill="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
