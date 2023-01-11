import React, {useCallback, useEffect, useRef, useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from './components/Header';
import WalletBalance from './components/WalletBalance';
import AssetsList from './components/AssetsList';

import TopHeader from '../../components/TopHeader';
import {
  makeSelectActiveNetwork,
  makeSelectActiveNetworkDetails,
  makeSelectNetworkDetailsLoading,
} from '../../store/networks/selectors';
import {
  getBalances,
  getGenerateAccount,
  getTokenList,
} from '../../store/userWallet/actions';
import {
  makeSelectAccounts,
  makeSelectBalanceLoading,
  makeSelectSelectedAccount,
  makeSelectSelectedAccountPublicKey,
  makeSelectWalletInitialized,
} from '../../store/userWallet/selectors';
import {styles} from './styles';
import {getNetworkDetails} from '../../store/networks/actions';
import {getNetworkParams} from '../../utils/networkHelpers';
import {
  initializeAccountWallets,
  setSelectedAccount,
} from '../../store/userWallet';
import {useDebounce} from '../../utils/hooksHelpers';
import {useShallowEqualSelector} from '../../store/utils';
import Confirm2FaModal from '../../modals/Confirm2FaModal';
import {setIs2FaAdded} from '../../store/auth';
import {check2FA} from '../../api/2fa';

const Wallet = () => {
  const dispatch = useDispatch();

  const walletInitialized = useSelector(makeSelectWalletInitialized);
  const isBalanceLoading = useSelector(makeSelectBalanceLoading);
  const isNetworkLoadingState = useSelector(makeSelectNetworkDetailsLoading);
  const [isNetworkLoading] = useDebounce(isNetworkLoadingState, 1200);

  const accountsList = useShallowEqualSelector(makeSelectAccounts);
  const activeNetwork = useShallowEqualSelector(makeSelectActiveNetwork);
  const activeNetworkDetails = useShallowEqualSelector(
    makeSelectActiveNetworkDetails,
  );
  const selectedAccount = useShallowEqualSelector(makeSelectSelectedAccount);

  const selectedAccountPublicKey = useSelector(
    makeSelectSelectedAccountPublicKey,
  );
  const [isConfirm2FaModalVisible, setConfirm2FaModalVisible] = useState(false);
  const verify2FAAsked = useRef<boolean>(false);

  useEffect(() => {
    if (!walletInitialized) {
      dispatch(initializeAccountWallets());
    }
  }, [walletInitialized]);

  useEffect(() => {
    activeNetwork && dispatch(getNetworkDetails(activeNetwork));
  }, [activeNetwork]);

  useEffect(() => {
    if (activeNetworkDetails) {
      dispatch(
        getTokenList({
          instance: activeNetworkDetails.instance,
          version: `${activeNetworkDetails.version}`,
          ...getNetworkParams(activeNetworkDetails),
        }),
      );
    }
  }, [activeNetworkDetails]);

  const onRefresh = useCallback(() => {
    if (walletInitialized && activeNetworkDetails && selectedAccount) {
      dispatch(
        getBalances({
          instance: activeNetworkDetails.instance,
          version: `${activeNetworkDetails.version}`,
          chainIds: activeNetworkDetails.chainIds,
          ...getNetworkParams(activeNetworkDetails),
        }),
      );
    }
  }, [walletInitialized, activeNetworkDetails, selectedAccount?.accountName]);

  useEffect(() => {
    if (walletInitialized && activeNetworkDetails && selectedAccount) {
      dispatch(
        getBalances({
          instance: activeNetworkDetails.instance,
          version: `${activeNetworkDetails.version}`,
          chainIds: activeNetworkDetails.chainIds,
          ...getNetworkParams(activeNetworkDetails),
        }),
      );
    }
  }, [walletInitialized, activeNetworkDetails, selectedAccount?.accountName]);

  useEffect(() => {
    if (walletInitialized) {
      if ((accountsList || []).length === 0) {
        dispatch(getGenerateAccount());
      } else if (
        (accountsList || []).length > 0 &&
        !selectedAccount?.accountName
      ) {
        dispatch(setSelectedAccount(accountsList[0]));
      }
    }
  }, [walletInitialized, accountsList, selectedAccount?.accountName]);

  useEffect(() => {
    if (selectedAccountPublicKey && !verify2FAAsked.current) {
      verify2FAAsked.current = true;
      check2FA(selectedAccountPublicKey).then(response2FA => {
        if (response2FA) {
          dispatch(setIs2FaAdded(true));
          setConfirm2FaModalVisible(true);
        } else {
          dispatch(setIs2FaAdded(false));
        }
      });
    }
  }, [selectedAccountPublicKey]);

  return (
    <>
      <View style={styles.container}>
        <Header />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isNetworkLoading || isBalanceLoading}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.content}>
          <TopHeader>
            <WalletBalance />
          </TopHeader>
          <AssetsList />
        </ScrollView>
      </View>
      <Confirm2FaModal
        isVisible={isConfirm2FaModalVisible}
        setVisible={setConfirm2FaModalVisible}
      />
    </>
  );
};

export default Wallet;
