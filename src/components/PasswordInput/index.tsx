import React, {FC, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {MAIN_COLOR} from '../../constants/styles';

import {styles} from './styles';
import {TPasswordInputProps} from './types';

import EyeShowIcon from '../../assets/images/eye-password-show.svg';
import EyeHideIcon from '../../assets/images/eye-password-hide.svg';

const PasswordInput: FC<TPasswordInputProps> = ({
  label,
  wrapperStyle,
  iconStyle,
  inputContainerStyle,
  errorMessage,
  style,
  white,
  ...restProps
}) => {
  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <Text style={styles.label}>{label || 'Password'}</Text>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          placeholderTextColor="gray"
          placeholder="Enter Password"
          {...restProps}
          style={[styles.input, style]}
          secureTextEntry={secureEntry}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{
            top: 16,
            bottom: 16,
            right: 16,
            left: 16,
          }}
          onPress={() => setSecureEntry(!secureEntry)}
          style={[styles.secureIcon, iconStyle]}>
          {!secureEntry ? (
            <EyeShowIcon stroke={white ? MAIN_COLOR : 'white'} />
          ) : (
            <EyeHideIcon stroke={white ? MAIN_COLOR : 'white'} />
          )}
        </TouchableOpacity>
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default PasswordInput;
