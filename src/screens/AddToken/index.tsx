import React, {useCallback, useRef, useState} from 'react';
import {Alert, Platform, ScrollView, View} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import Header from './components/Header';
import FooterButton from '../../components/FooterButton';
import Input from '../../components/Input';
import {addTokenSchema} from '../../validation/addTokenSchema';
import {styles} from './styles';
import {
  makeSelectSelectedAccount,
  makeSelectSelectedToken,
} from '../../store/userWallet/selectors';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {useScrollBottomOnKeyboard} from '../../utils/keyboardHelpers';
import {makeSelectActiveNetworkDetails} from '../../store/networks/selectors';
import {getNetworkParams} from '../../utils/networkHelpers';
import {addNewToken} from '../../store/userWallet';
import {defaultBalances} from '../../store/userWallet/const';
import {getBalances} from '../../store/userWallet/actions';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useShallowEqualSelector} from '../../store/utils';
import {bottomSpace} from '../../utils/deviceHelpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ERootStackRoutes,
  TNavigationProp,
  TNavigationRouteProp,
} from '../../routes/types';
import {getToken} from '../../api/kadena/token';

const AddToken = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.AddToken>>();
  const route = useRoute<TNavigationRouteProp<ERootStackRoutes.AddToken>>();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialTokenName = route?.params?.tokenName || '';
  const selectedAccount = useShallowEqualSelector(makeSelectSelectedAccount);
  const selectedToken = useShallowEqualSelector(makeSelectSelectedToken);
  const networkDetail = useShallowEqualSelector(makeSelectActiveNetworkDetails);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: addTokenSchema,
    mode: 'onChange',
    defaultValues: {
      ...(selectedToken || {}),
      tokenAddress: selectedToken?.tokenAddress || initialTokenName || '',
    },
  });

  const handlePressSave = useCallback(
    (formValues: FieldValues) => {
      if (networkDetail && selectedAccount?.accountName) {
        setIsLoading(true);
        getToken({
          accountName: selectedAccount?.accountName,
          token: formValues.tokenAddress,
          ...networkDetail,
          ...getNetworkParams(networkDetail),
        })
          .then(responseData => {
            if (responseData) {
              dispatch(
                addNewToken({
                  tokenAddress: formValues.tokenAddress,
                  tokenName: formValues.tokenName,
                  totalAmount: 0,
                  chainBalance: defaultBalances,
                }),
              );
              setIsLoading(false);
              navigation.goBack();
              if (route?.params?.onTokenAdd) {
                route?.params?.onTokenAdd(
                  formValues.tokenName,
                  formValues.tokenAddress,
                );
              }
              setTimeout(() => {
                dispatch(
                  getBalances({
                    instance: networkDetail.instance,
                    version: `${networkDetail.version}`,
                    chainIds: networkDetail.chainIds,
                    ...getNetworkParams(networkDetail),
                  }),
                );
              }, 600);
            } else {
              ReactNativeHapticFeedback.trigger('impactMedium', {
                enableVibrateFallback: false,
                ignoreAndroidSystemSettings: false,
              });
              Alert.alert('Failed to import the token', 'Token does not exist');
            }
          })
          .catch(() => {
            setIsLoading(false);
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Alert.alert('Failed to import the token', 'Token does not exist');
          });
      }
    },
    [initialTokenName, networkDetail, selectedAccount],
  );

  const scrollRef = useRef<ScrollView | null>(null);
  useScrollBottomOnKeyboard(scrollRef);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.contentWrapper}>
        <Controller
          control={control}
          name="tokenAddress"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Token Contract Address"
              placeholder="Type Contract Address"
              autoCapitalize="none"
              wrapperStyle={styles.inputWrapper}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={errors.tokenAddress?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="tokenName"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Token Symbol"
              placeholder="Type Token Symbol"
              autoCapitalize="characters"
              wrapperStyle={styles.inputWrapper}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={errors.tokenName?.message as string}
            />
          )}
        />
        {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-bottomSpace} />}
      </ScrollView>
      <View style={styles.footer}>
        <FooterButton
          disabled={!isValid || isLoading}
          title="Add Token"
          onPress={handleSubmit(handlePressSave)}
        />
      </View>
    </View>
  );
};

export default AddToken;
