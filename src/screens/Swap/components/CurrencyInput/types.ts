import {Dispatch, SetStateAction} from 'react';
import {TWallet} from '../../../../store/userWallet/types';

export type TValues = {
  amount: string;
  amountWithSlippage: string;
  balance: number;
  coin: string;
  address: string;
  precision: number;
};

export type TCurrencyInputProps = {
  disabled?: boolean;
  walletList: TWallet[];
  selectedToken: TValues;
  setSelectedToken: Dispatch<SetStateAction<TValues>>;
  anotherToken: TValues;
  setAnotherToken: Dispatch<SetStateAction<TValues>>;
  title: 'GIVE' | 'RECEIVE';
};
