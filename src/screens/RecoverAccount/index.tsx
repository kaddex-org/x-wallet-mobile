import React, {useCallback} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import Header from './components/Header';
import FooterButton from '../../components/FooterButton';
import Input from '../../components/Input';
import {styles} from './styles';
import {getRestoreAccount} from '../../store/userWallet/actions';
import api from '../../api';
import {recoverAccountSchema} from '../../validation/recoverAccountSchema';
import queryString from 'query-string';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useNavigation} from '@react-navigation/native';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';

const RecoverAccount = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.RecoverAccount>>();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: recoverAccountSchema,
    mode: 'onChange',
  });

  const handlePressSave = useCallback(
    (data: FieldValues) => {
      api
        .get(
          `/api/validate-seeds?${queryString.stringify({
            seeds: data.seeds || '',
          })}`,
        )
        .then(response => {
          if (response.data) {
            dispatch(
              getRestoreAccount({
                seeds: data.seeds || '',
                accountIndex: data.accountIndex || 0,
              }),
            );
            navigation.goBack();
          } else {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Alert.alert(
              'Failed to import the account',
              'Invalid secret recovery phrase',
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
            'Invalid secret recovery phrase',
          );
        });
    },
    [navigation],
  );

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Header />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          style={styles.contentWrapper}>
          <Controller
            control={control}
            name="seeds"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Seed Phrases"
                placeholder="Enter Secret Phrases"
                wrapperStyle={styles.inputWrapper}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={true}
                value={value}
                errorMessage={errors.seeds?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            name="accountIndex"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Account Number"
                placeholder="Default: 0"
                wrapperStyle={styles.inputWrapper}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.accountIndex?.message as string}
              />
            )}
          />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <FooterButton
          disabled={!isValid}
          title="Recover"
          onPress={handleSubmit(handlePressSave)}
        />
      </View>
    </View>
  );
};

export default RecoverAccount;
