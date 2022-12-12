import {createSlice} from '@reduxjs/toolkit';

import {TUserWalletState} from './types';
import {defaultRequestValues} from '../const';
import {defaultBalances} from './const';

const initialState: TUserWalletState = {
  initialized: false,
  accounts: [],
  selectedAccount: null,
  selectedToken: null,
  balanceDetailState: defaultRequestValues,
  usdEquivalents: [],
  isConnectedWalletConnect: false,
  searchTokenList: [],
  nonTransferableTokenList: [],
};

const userWallet = createSlice({
  name: 'userWallet',
  initialState,
  reducers: {
    initializeAccountWallets: state => {
      if (state.accounts && (state.accounts || []).length > 0) {
        const maxSizeWalletAccount = state.accounts.reduce((prev, current) => {
          return (prev.wallets || []).length > (current.wallets || []).length
            ? prev
            : current;
        });
        if ((maxSizeWalletAccount.wallets || []).length > 0) {
          if (state.selectedAccount) {
            maxSizeWalletAccount.wallets.forEach(walletItem => {
              const currentAccountWallets = [...state.selectedAccount!.wallets];
              if (
                !currentAccountWallets.some(
                  item => item.tokenAddress === walletItem.tokenAddress,
                )
              ) {
                state.selectedAccount!.wallets.push({
                  ...walletItem,
                  totalAmount: 0,
                  chainBalance: defaultBalances,
                });
              }
            });
          }
          for (
            let accountIndex = 0;
            accountIndex < (state.accounts || []).length;
            accountIndex++
          ) {
            maxSizeWalletAccount.wallets.forEach(walletItem => {
              const currentAccountWallets = [
                ...state.accounts[accountIndex].wallets,
              ];
              if (
                !currentAccountWallets.some(
                  item => item.tokenAddress === walletItem.tokenAddress,
                )
              ) {
                state.accounts[accountIndex].wallets.push({
                  ...walletItem,
                  totalAmount: 0,
                  chainBalance: defaultBalances,
                });
              }
            });
          }
        }
      }
      state.initialized = true;
    },

    setSelectedAccount: (state, {payload}) => {
      state.selectedAccount = payload;
    },

    setSelectedToken: (state, {payload}) => {
      state.selectedToken = payload;
    },

    deleteSelectedAccount: state => {
      if (state.accounts) {
        state.accounts = state.accounts.filter(
          item => item?.accountName !== state.selectedAccount?.accountName,
        );
      }
      if ((state.accounts || []).length > 0) {
        state.selectedAccount = state.accounts[0];
      } else {
        state.selectedAccount = null;
      }
    },

    deleteSelectedToken: (state, {payload}) => {
      if (state.accounts && payload) {
        for (
          let accountIndex = 0;
          accountIndex < (state.accounts || []).length;
          accountIndex++
        ) {
          state.accounts[accountIndex].wallets = state.accounts[
            accountIndex
          ].wallets.filter(item => item.tokenAddress !== payload?.tokenAddress);
        }
      }
      if (state.selectedAccount) {
        state.selectedAccount.wallets = state.selectedAccount.wallets.filter(
          item => item.tokenAddress !== payload?.tokenAddress,
        );
      }
    },

    addNewAccount: (state, {payload}) => {
      if (state.accounts) {
        const foundIndex = state.accounts.findIndex(
          item => item.accountName === payload.accountName,
        );
        if (foundIndex > -1) {
          state.accounts[foundIndex] = payload;
        } else {
          state.accounts = state.accounts.concat([payload]);
        }
        state.selectedAccount = payload;
        state.accounts = state.accounts.filter(
          (item, pos, self) =>
            self.findIndex(
              subItem => subItem.accountName === item.accountName,
            ) === pos,
        );
      } else {
        state.accounts = [payload];
      }
    },

    addNewToken: (state, {payload}) => {
      if (state.selectedAccount) {
        if (state.selectedAccount.wallets) {
          const foundWalletIndex = state.selectedAccount.wallets.findIndex(
            item => item.tokenAddress === payload.tokenAddress,
          );
          if (foundWalletIndex > -1) {
            state.selectedAccount.wallets[foundWalletIndex] = payload;
          } else {
            state.selectedAccount.wallets =
              state.selectedAccount.wallets.concat([payload]);
          }
        } else {
          state.selectedAccount.wallets = [payload];
        }
        state.selectedAccount.wallets = state.selectedAccount.wallets.filter(
          (item, pos, self) =>
            self.findIndex(
              subItem => subItem.tokenAddress === item.tokenAddress,
            ) === pos,
        );
        for (
          let accountIndex = 0;
          accountIndex < (state.accounts || []).length;
          accountIndex++
        ) {
          if (state.accounts[accountIndex].wallets) {
            const foundWalletIndex = state.accounts[
              accountIndex
            ].wallets.findIndex(
              item => item.tokenAddress === payload.tokenAddress,
            );
            if (foundWalletIndex > -1) {
              state.accounts[accountIndex].wallets[foundWalletIndex] = payload;
            } else {
              state.accounts[accountIndex].wallets = state.accounts[
                accountIndex
              ].wallets.concat([payload]);
            }
          } else {
            state.accounts[accountIndex].wallets = [payload];
          }
          state.accounts[accountIndex].wallets = state.accounts[
            accountIndex
          ].wallets.filter(
            (item, pos, self) =>
              self.findIndex(
                subItem => subItem.tokenAddress === item.tokenAddress,
              ) === pos,
          );
        }
      }
    },

    setBalanceDetailLoading: (state, action) => {
      state.balanceDetailState.fetching = action.payload;
    },
    setBalanceDetailSuccess: (state, {payload}) => {
      state.balanceDetailState.data = payload;
      if (state.selectedAccount) {
        state.selectedAccount.wallets = payload;
        const accountIndex = state.accounts.findIndex(
          item => item.accountName === state.selectedAccount?.accountName,
        );
        if (accountIndex > -1) {
          state.accounts[accountIndex].wallets = payload;
        }
      }
    },
    setBalanceDetailError: (state, action) => {
      state.balanceDetailState.error = action.payload;
    },

    setUsdEquivalents: (state, {payload}) => {
      state.usdEquivalents = payload;
    },

    setIsConnectedWalletConnect: (state, {payload}) => {
      state.isConnectedWalletConnect = payload;
    },

    setSearchTokenList: (state, {payload}) => {
      state.searchTokenList = payload;
    },

    setNonTransferableTokenList: (state, {payload}) => {
      state.nonTransferableTokenList = payload;
    },

    setInitialUserWalletState: state => {
      state.accounts = initialState.accounts;
      state.balanceDetailState = initialState.balanceDetailState;
      state.selectedToken = initialState.selectedToken;
      state.usdEquivalents = initialState.usdEquivalents;
      state.selectedAccount = initialState.selectedAccount;
    },
  },
});

export const {
  initializeAccountWallets,
  setSelectedAccount,
  setSelectedToken,
  addNewAccount,
  addNewToken,
  deleteSelectedAccount,
  deleteSelectedToken,
  setBalanceDetailError,
  setBalanceDetailLoading,
  setBalanceDetailSuccess,
  setUsdEquivalents,
  setSearchTokenList,
  setNonTransferableTokenList,
  setIsConnectedWalletConnect,
  setInitialUserWalletState,
} = userWallet.actions;

export default userWallet.reducer;
