import {Dispatch, SetStateAction} from 'react';
import {TWallet} from '../../../../store/userWallet/types';
import {TValues} from '../CurrencyInput/types';

export type TSelectTokenModal = {
  close: () => void;
  isVisible: boolean;
  walletList: TWallet[];
  selectedToken: TValues;
  setSelectedToken: Dispatch<SetStateAction<TValues>>;
  anotherToken: TValues;
  title: 'GIVE' | 'RECEIVE';
};
