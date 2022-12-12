import {useNavigation} from '@react-navigation/native';
import queryString from 'query-string';
import React, {useCallback, useRef} from 'react';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {useDispatch} from 'react-redux';
import api from '../../api';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';

import Logo from '../../assets/images/logo.svg';
import PasswordInput from '../../components/PasswordInput';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import {setPassword, setPhrases} from '../../store/auth';
import {getRestoreAccount} from '../../store/userWallet/actions';
import {bottomSpace} from '../../utils/deviceHelpers';
import {useScrollBottomOnKeyboard} from '../../utils/keyboardHelpers';
import {recoverySchema} from '../../validation/recoverySchema';

import {styles} from './styles';

const bgImage = require('../../assets/images/bgimage.png');

const RecoveryFromSeeds = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.RecoveryFromSeeds>>();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: recoverySchema,
    mode: 'onChange',
  });

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePressRecover = useCallback(
    ({seeds, password}: FieldValues) => {
      api
        .get(
          `/api/validate-seeds?${queryString.stringify({
            seeds: seeds || '',
          })}`,
        )
        .then(async response => {
          if (response.data) {
            api
              .get(
                `/api/hash-password?${queryString.stringify({
                  password: password || '',
                })}`,
              )
              .then(async hashResponse => {
                if (hashResponse.data.hash) {
                  dispatch(setPassword(hashResponse.data.hash));
                  dispatch(setPhrases(seeds.split(' ')));
                  dispatch(
                    getRestoreAccount({
                      seeds: seeds || '',
                      accountIndex: 0,
                    }),
                  );
                  navigation.navigate({
                    name: ERootStackRoutes.SignIn,
                    params: undefined,
                  });
                } else {
                  ReactNativeHapticFeedback.trigger('impactMedium', {
                    enableVibrateFallback: false,
                    ignoreAndroidSystemSettings: false,
                  });
                  Alert.alert(
                    'Failed to import the account',
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
                  'Failed to import the account',
                  'Something went wrong. Please try again later.',
                );
              });
          } else {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Alert.alert(
              'Failed to import the account',
              'Invalid secret recovery phrase or deleted account',
            );
          }
        })
        .catch(() => {
          ReactNativeHapticFeedback.trigger('impactMedium', {
            enableVibrateFallback: false,
            ignoreAndroidSystemSettings: false,
          });
          Alert.alert(
            'Failed to import the account',
            'Invalid secret recovery phrase or deleted account',
          );
        });
    },
    [navigation],
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
        <Text style={styles.text}>
          {'Import a wallet with\nSecret Recovery Phrase'}
        </Text>
        <Controller
          control={control}
          name="seeds"
          render={({field: {onChange, onBlur, value}}) => (
            <PasswordInput
              wrapperStyle={styles.seeds}
              autoFocus={true}
              label="Secret Phrases (with spaces)"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              placeholder="Enter Secret Phrases"
              blurOnSubmit={true}
              errorMessage={errors.seeds?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <PasswordInput
              wrapperStyle={styles.password}
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
              onSubmitEditing={handleSubmit(handlePressRecover)}
            />
          )}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isValid}
          style={[styles.button, !isValid && styles.disabledBtn]}
          onPress={handleSubmit(handlePressRecover)}>
          <Text style={styles.buttonText}>Restore</Text>
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

export default RecoveryFromSeeds;
