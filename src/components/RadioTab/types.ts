import {StyleProp, ViewStyle} from 'react-native';

export type TRadioTabValue = string;

export type TRadioTabOption = {
  value: TRadioTabValue;
  label: string;
};

export type TRadioTabProps = {
  options: TRadioTabOption[];
  value?: TRadioTabValue;
  onChange?: (value: TRadioTabValue) => void;
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonsWrapperStyle?: StyleProp<ViewStyle>;
};
