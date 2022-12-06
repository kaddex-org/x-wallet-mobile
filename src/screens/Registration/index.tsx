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
import {useDispatch} from 'react-redux';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Logo from '../../assets/images/logo.svg';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';

import {styles} from './styles';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import {changePassword} from '../../store/auth';
import PasswordInput from '../../components/PasswordInput';
import {createPasswordSchema} from '../../validation/createPasswordSchema';
import {useScrollBottomOnKeyboard} from '../../utils/keyboardHelpers';
import queryString from 'query-string';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import api from '../../api';
import {useNavigation} from '@react-navigation/native';
import {bottomSpace} from '../../utils/deviceHelpers';

const bgImage = require('../../assets/images/bgimage.png');

const Registration = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.Registration>>();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({resolver: createPasswordSchema, mode: 'onChange'});

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePressCreate = useCallback((data: FieldValues) => {
    api
      .get(
        `/api/hash-password?${queryString.stringify({
          password: data.password || '',
        })}`,
      )
      .then(hashResponse => {
        if (hashResponse.data.hash) {
          dispatch(changePassword(hashResponse.data.hash));
          navigation.navigate({
            name: ERootStackRoutes.SecretRecoveryPhraseTerm,
            params: undefined,
          });
        } else {
          ReactNativeHapticFeedback.trigger('impactMedium', {
            enableVibrateFallback: false,
            ignoreAndroidSystemSettings: false,
          });
          Alert.alert(
            'Failed to register',
            'Something went wrong. Please try again later.',
          );
        }
      })
      .catch(() => {
        ReactNativeHapticFeedback.trigger('impactMedium', {
          enableVibrateFallback: false,
          ignoreAndroidSystemSettings: false,
        });
        Alert.alert(
          'Failed to register',
          'Something went wrong. Please try again later.',
        );
      });
  }, []);

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
        <Text style={styles.text}>Create Password</Text>
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <PasswordInput
              wrapperStyle={styles.password}
              autoFocus={true}
              label="New Password"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              blurOnSubmit={true}
              errorMessage={errors.password?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({field: {onChange, onBlur, value}}) => (
            <PasswordInput
              wrapperStyle={styles.confirmPassword}
              label="Confirm Password"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              blurOnSubmit={true}
              errorMessage={errors.confirmPassword?.message as string}
              onSubmitEditing={handleSubmit(handlePressCreate)}
            />
          )}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isValid}
          style={[styles.button, !isValid && styles.disabledBtn]}
          onPress={handleSubmit(handlePressCreate)}>
          <Text style={styles.buttonText}>Create</Text>
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

export default Registration;
