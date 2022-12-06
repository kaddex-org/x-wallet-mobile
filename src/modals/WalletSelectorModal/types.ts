import {TWalletScreenNavigation} from '../../screens/Wallet/types';

export type TWalletSelectorModalProps = {
  isVisible: boolean;
  toggle: () => void;
  navigation?: TWalletScreenNavigation;
};
