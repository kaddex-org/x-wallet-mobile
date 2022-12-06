import {ItemType} from 'react-native-dropdown-picker';
import {StyleProp, ViewStyle} from 'react-native';
import {Dispatch, SetStateAction} from 'react';

export type TChainIdProps = {
  label?: string;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  items: ItemType<string>[];
  wrapperStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
};
