import React, {useCallback} from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import Header from './components/Header';
import FooterButton from '../../components/FooterButton';
import Input from '../../components/Input';
import {addCreateContactSchema} from '../../validation/addCreateContactSchema';
import {createContact, updateSelectedContact} from '../../store/contacts';
import {makeSelectSelectedContact} from '../../store/contacts/selectors';
import {styles} from './styles';
import ChainId from '../../components/ChainId';
import {chainIds} from '../Send/consts';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {useShallowEqualSelector} from '../../store/utils';
import {bottomSpace} from '../../utils/deviceHelpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ERootStackRoutes,
  TNavigationProp,
  TNavigationRouteProp,
} from '../../routes/types';

const AddEditContact = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.AddEditContact>>();
  const route =
    useRoute<TNavigationRouteProp<ERootStackRoutes.AddEditContact>>();

  const isCreate = Boolean(route.params?.isCreate);

  const dispatch = useDispatch();

  const selectedContact = useShallowEqualSelector(makeSelectSelectedContact);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: addCreateContactSchema,
    defaultValues: !isCreate && selectedContact ? selectedContact : undefined,
    mode: 'onChange',
  });

  const handlePressSave = useCallback(
    (data: FieldValues) => {
      dispatch(isCreate ? createContact(data) : updateSelectedContact(data));
      navigation.goBack();
    },
    [navigation, isCreate],
  );

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.contentWrapper}>
        <Controller
          control={control}
          name="contactName"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Contact Name"
              placeholder="Type Contact Name"
              wrapperStyle={styles.inputWrapper}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={errors.contactName?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="accountName"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="account name"
              placeholder="Insert Account Name"
              multiline
              numberOfLines={5}
              wrapperStyle={styles.inputWrapper}
              style={styles.accountNameInput}
              textAlignVertical="top"
              autoCapitalize="none"
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
              errorMessage={errors.chainId?.message as string}
            />
          )}
        />
        {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-bottomSpace} />}
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

export default AddEditContact;
