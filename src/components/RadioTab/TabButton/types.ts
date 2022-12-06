import {StyleProp, ViewStyle} from 'react-native';

export type TTabButtonProps = {
  isActive?: boolean;
  title: string;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
};
