import React, {FC} from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {TInputProps} from './types';

const Input: FC<TInputProps> = ({
  label,
  wrapperStyle,
  errorMessage,
  style,
  inputRef,
  ...restProps
}) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.inputStyle, style]}
        {...restProps}
        ref={inputRef}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;
