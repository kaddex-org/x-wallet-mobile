import {ModalProps} from 'react-native-modal';

export type TModalProps = Partial<ModalProps> & {
  close?: () => void;
  title?: string;
  showCloseButton?: boolean;
  leftHeaderItem?: JSX.Element;
  onPressLeftItem?: () => void;
  logo?: JSX.Element;
  contentStyle?: any;
};
