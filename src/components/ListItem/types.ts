import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type TListItemProps = {
  text: string;
  icon?: JSX.Element;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};
