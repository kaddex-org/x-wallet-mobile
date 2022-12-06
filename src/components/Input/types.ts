import {StyleProp, TextInput, TextInputProps, ViewStyle} from 'react-native';
import {MutableRefObject} from 'react';

export type TInputProps = {
  label?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
  inputRef?: MutableRefObject<TextInput | null>;
} & TextInputProps;
