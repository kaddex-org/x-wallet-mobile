import {StyleProp, TextInputProps, ViewStyle} from 'react-native';

export type TPasswordInputProps = {
  label?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
  white?: boolean;
} & TextInputProps;
