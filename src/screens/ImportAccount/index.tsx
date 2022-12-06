import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import Header from './components/Header';
import FooterButton from '../../components/FooterButton';
import Input from '../../components/Input';
import {styles} from './styles';
import {importAccountSchema} from '../../validation/importAccountSchema';
import {getImportAccount} from '../../store/userWallet/actions';
import {TAccountImportRequest} from '../../store/userWallet/types';
import {makeSelectActiveNetworkDetails} from '../../store/networks/selectors';
import {getNetworkParams} from '../../utils/networkHelpers';
import ChainId from '../../components/ChainId';
import {chainIds} from '../Send/consts';
import {useShallowEqualSelector} from '../../store/utils';
import {useNavigation} from '@react-navigation/native';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';

const ImportAccount = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.ImportAccount>>();

  const dispatch = useDispatch();

  const networkDetail = useShallowEqualSelector(makeSelectActiveNetworkDetails);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: importAccountSchema,
    mode: 'onChange',
  });

  const handlePressSave = useCallback(
    (formValues: FieldValues) => {
      if (networkDetail) {
        const data: TAccountImportRequest = {
          accountName: formValues.accountName as string,
          privateKey: formValues.privateKey as string,
          chainId: formValues.chainId as string,
          ...networkDetail,
          ...getNetworkParams(networkDetail!),
        };
        dispatch(getImportAccount(data));
        navigation.goBack();
      }
    },
    [networkDetail, navigation],
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
            name="accountName"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Account Name"
                autoCapitalize="none"
                placeholder="Type Account Name"
                wrapperStyle={styles.inputWrapper}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.accountName?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            name="chainId"
            render={({field: {onChange, value}}) => (
              <ChainId
                value={value}
                setValue={onChange}
                items={chainIds}
                wrapperStyle={styles.inputWrapper}
                errorMessage={errors.chainId?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            name="privateKey"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Private Key"
                placeholder="Type Private Key"
                wrapperStyle={styles.inputWrapper}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.privateKey?.message as string}
              />
            )}
          />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <FooterButton
          disabled={!isValid}
          title="Import"
          onPress={handleSubmit(handlePressSave)}
        />
      </View>
    </View>
  );
};

export default ImportAccount;
