import React, {useCallback, useEffect} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import Header from './components/Header';
import FooterButton from '../../components/FooterButton';
import Input from '../../components/Input';
import {styles} from './styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
  createSignClient,
  defaultWalletConnectParams,
} from '../../utils/walletConnect';
import {getSavedValue, saveValue} from '../../utils/storageHelplers';
import {walletConnectSchema} from '../../validation/walletConnectSchema';
import {useNavigation} from '@react-navigation/native';

const WalletConnectSettings = () => {
  const navigation = useNavigation();

  const {
    setValue,
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: walletConnectSchema,
    mode: 'onChange',
  });

  useEffect(() => {
    getSavedValue('walletConnectParams').then(params => {
      setValue(
        'projectId',
        params?.projectId || defaultWalletConnectParams?.projectId,
      );
      setValue(
        'relayUrl',
        params?.relayUrl || defaultWalletConnectParams?.relayUrl,
      );
    });
  }, []);

  const handlePressSave = useCallback(
    async (data: FieldValues) => {
      try {
        await createSignClient(data);
        await saveValue('walletConnectParams', data);
        setTimeout(() => navigation.goBack(), 150);
      } catch (e) {
        ReactNativeHapticFeedback.trigger('impactMedium', {
          enableVibrateFallback: false,
          ignoreAndroidSystemSettings: false,
        });
        Alert.alert(
          'Failed to change WalletConnect config',
          'Invalid parameters',
        );
      }
    },
    [navigation],
  );

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        style={styles.contentWrapper}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Controller
          control={control}
          name="projectId"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Project ID"
              placeholder="Enter Project ID"
              wrapperStyle={styles.inputWrapper}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={errors.projectId?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="relayUrl"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Relay URL"
              placeholder="Enter Relay URL"
              autoCapitalize="none"
              wrapperStyle={styles.inputWrapper}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={errors.relayUrl?.message as string}
            />
          )}
        />
      </ScrollView>
      <View style={styles.footer}>
        <FooterButton
          title="Save"
          onPress={handleSubmit(handlePressSave)}
          disabled={!isValid}
        />
      </View>
    </View>
  );
};

export default WalletConnectSettings;
