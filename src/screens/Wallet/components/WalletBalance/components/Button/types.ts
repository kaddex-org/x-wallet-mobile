import {StyleProp, ViewStyle} from 'react-native';

export type TButtonProps = {
  title: string;
  icon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  disabled?: boolean;
};
