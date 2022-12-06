import {TChainBalance, TWallet} from './types';

export const defaultBalances: TChainBalance = {
  '0': 0,
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0,
  '9': 0,
  '10': 0,
  '11': 0,
  '12': 0,
  '13': 0,
  '14': 0,
  '15': 0,
  '16': 0,
  '17': 0,
  '18': 0,
  '19': 0,
};

export const defaultWallets: TWallet[] = [
  {
    tokenAddress: 'coin',
    tokenName: 'KDA',
    totalAmount: 0,
    chainBalance: defaultBalances,
  },
  {
    tokenAddress: 'kaddex.kdx',
    tokenName: 'KDX',
    totalAmount: 0,
    chainBalance: defaultBalances,
  },
];

export const reverseCoins: string[] = ['arkade.token'];
