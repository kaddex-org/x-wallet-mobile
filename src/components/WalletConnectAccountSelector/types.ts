import {TAccount} from '../../store/userWallet/types';

export type TWalletConnectAccountSelectorProps = {
  onSelectAccounts: (accounts: TAccount[]) => void;
};
