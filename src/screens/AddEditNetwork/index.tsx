import React, {useCallback, useMemo} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import Header from './components/Header';
import FooterButton from '../../components/FooterButton';
import Input from '../../components/Input';
import {styles} from './styles';
import {addCreateNetworkSchema} from '../../validation/addCreateNetworkSchema';
import {makeSelectSelectedNetwork} from '../../store/networks/selectors';
import {createNetwork, updateSelectedNetwork} from '../../store/networks';
import {EDefaultNetwork} from '../Networks/types';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useShallowEqualSelector} from '../../store/utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ERootStackRoutes,
  TNavigationProp,
  TNavigationRouteProp,
} from '../../routes/types';
import axios from 'axios';

const AddEditNetwork = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.AddEditNetwork>>();
  const route =
    useRoute<TNavigationRouteProp<ERootStackRoutes.AddEditNetwork>>();

  const isCreate = Boolean(route.params?.isCreate);
  const dispatch = useDispatch();

  const selectedNetwork = useShallowEqualSelector(makeSelectSelectedNetwork);

  const isEditable = useMemo(
    () => isCreate || !selectedNetwork?.isDefault,
    [isCreate, selectedNetwork],
  );

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: addCreateNetworkSchema,
    defaultValues: !isCreate && selectedNetwork ? selectedNetwork : undefined,
    mode: 'onChange',
  });

  const handlePressSave = useCallback(
    async (data: FieldValues) => {
      try {
        const response = await axios.get(`${data.host}/info`);
        if (response.data?.nodeApiVersion && response.data?.nodeVersion) {
          const _data = {
            ...data,
            name: data.name || 'Custom',
            network: EDefaultNetwork.custom,
          };
          dispatch(
            isCreate ? createNetwork(_data) : updateSelectedNetwork(_data),
          );
          setTimeout(() => navigation.goBack(), 150);
        }
      } catch (e) {
        ReactNativeHapticFeedback.trigger('impactMedium', {
          enableVibrateFallback: false,
          ignoreAndroidSystemSettings: false,
        });
        Alert.alert('Failed to add the network', 'Invalid network information');
      }
    },
    [isCreate, navigation],
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
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Network Name"
              placeholder="Insert Network Name"
              wrapperStyle={styles.inputWrapper}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={errors.name?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="host"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="New RPC URL"
              placeholder="Insert URL"
              autoCapitalize="none"
              wrapperStyle={styles.inputWrapper}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={errors.host?.message as string}
              editable={isEditable}
            />
          )}
        />
        <Controller
          control={control}
          name="explorerUrl"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Block Explorer URL"
              autoCapitalize="none"
              placeholder="Insert URL"
              wrapperStyle={styles.inputWrapper}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={errors.explorerURL?.message as string}
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

export default AddEditNetwork;
