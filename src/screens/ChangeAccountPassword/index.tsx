import React, {useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import FooterButton from '../../components/FooterButton';
import {styles} from './styles';
import PasswordInput from '../../components/PasswordInput';
import {Controller, useForm} from 'react-hook-form';
import {resetAccountPassword} from '../../validation/resetAccountPassword';
import {TFields, TChangeAccountPasswordForm} from './types';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';
import {useNavigation} from '@react-navigation/native';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import Toast from 'react-native-toast-message';
import {statusBarHeight} from '../../utils/deviceHelpers';
import api from '../../api';
import queryString from 'query-string';
import {setPassword} from '../../store/auth';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useDispatch, useSelector} from 'react-redux';
import {makeSelectHashPassword} from '../../store/auth/selectors';

const fields: TFields[] = [
  {
    name: 'currentPassword',
    label: 'Current Password',
  },
  {
    name: 'newPassword',
    label: 'New Password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
  },
];

const ChangeAccountPassword = () => {
  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Login>>();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TChangeAccountPasswordForm>({resolver: resetAccountPassword});

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const hash = useSelector(makeSelectHashPassword);

  const handlePressChange = useCallback(
    (data: TChangeAccountPasswordForm) => {
      api
        .get(
          `/api/compare-password?${queryString.stringify({
            password: data.currentPassword || '',
            hash,
          })}`,
        )
        .then(compareResponse => {
          if (compareResponse.data) {
            api
              .get(
                `/api/hash-password?${queryString.stringify({
                  password: data.newPassword || '',
                })}`,
              )
              .then(hashResponse => {
                if (hashResponse.data.hash) {
                  dispatch(setPassword(hashResponse.data.hash));
                  Toast.show({
                    type: 'success',
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                    text1: 'Password has been successfully changed !',
                    topOffset: statusBarHeight + 16,
                  });
                  handlePressBack();
                } else {
                  ReactNativeHapticFeedback.trigger('impactMedium', {
                    enableVibrateFallback: false,
                    ignoreAndroidSystemSettings: false,
                  });
                  Alert.alert(
                    'Failed to change password',
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
                  'Failed to change password',
                  'Something went wrong. Please try again later.',
                );
              });
          } else {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Alert.alert('Failed to verify', 'Invalid password');
          }
        })
        .catch(() => {
          ReactNativeHapticFeedback.trigger('impactMedium', {
            enableVibrateFallback: false,
            ignoreAndroidSystemSettings: false,
          });
          Alert.alert(
            'Failed to verify',
            'Something went wrong. Please try again later.',
          );
        });
    },
    [handlePressBack, hash],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePressBack}
          style={styles.backBtnWrapper}>
          <ArrowLeftSvg fill="#787B8E" />
        </TouchableOpacity>
        <Text style={styles.title}>Change Password</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
          {fields.map(field => (
            <Controller
              key={field.name}
              control={control}
              name={field.name}
              render={({field: {onChange, onBlur, value}}) => (
                <PasswordInput
                  autoFocus={field.name === 'currentPassword'}
                  label={field.label}
                  onChangeText={onChange}
                  value={value}
                  white
                  onBlur={onBlur}
                  blurOnSubmit={true}
                  wrapperStyle={styles.password}
                  style={styles.input}
                  inputContainerStyle={styles.inputContainer}
                  iconStyle={styles.icon}
                  errorMessage={errors[field.name]?.message as string}
                  onSubmitEditing={handleSubmit(handlePressChange)}
                />
              )}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.footer}>
        <FooterButton
          style={styles.footerBtn}
          title="CHANGE PASSWORD"
          onPress={handleSubmit(handlePressChange)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangeAccountPassword;
