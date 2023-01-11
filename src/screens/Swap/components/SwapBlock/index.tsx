import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {makeSelectIsSwapping} from '../../../../store/transfer/selectors';
import {
  makeSelectNonTransferableTokenList,
  makeSelectSelectedAccount,
} from '../../../../store/userWallet/selectors';
import {useShallowEqualSelector} from '../../../../store/utils';
import Button from '../../../Wallet/components/WalletBalance/components/Button';
import CurrencyInput from '../CurrencyInput';
import SwapSvg from '../../../../assets/images/swap.svg';
import {styles} from './styles';
import {TValues} from '../CurrencyInput/types';
import {usePactContext} from '../../../../contexts';
import {
  makeSelectActiveNetworkDetails,
  makeSelectNetworkDetailsLoading,
} from '../../../../store/networks/selectors';
import Info from '../Info';
import {swapRequest} from '../../../../store/transfer/actions';
import {reduceBalance} from '../../../../utils/numberHelpers';
import {MAIN_COLOR} from '../../../../constants/styles';
import Toast from 'react-native-toast-message';
import {statusBarHeight} from '../../../../utils/deviceHelpers';
import {TWallet} from '../../../../store/userWallet/types';
import Warning from '../../../../components/Warning';
import ConfirmModal from '../ConfirmModal';
import {NetworkName} from '../../../../api/types';

const SwapBlock = () => {
  const selectedAccount = useShallowEqualSelector(makeSelectSelectedAccount);
  const isSwapping = useShallowEqualSelector(makeSelectIsSwapping);
  const pact = usePactContext();
  const networkDetail = useShallowEqualSelector(makeSelectActiveNetworkDetails);
  const networkDetailFetching = useShallowEqualSelector(
    makeSelectNetworkDetailsLoading,
  );
  const nonTransferableTokens = useShallowEqualSelector(
    makeSelectNonTransferableTokenList,
  );

  const walletList = useMemo(
    () =>
      (selectedAccount?.wallets || []).filter(
        (item: TWallet) => !nonTransferableTokens.includes(item.tokenAddress),
      ),
    [selectedAccount?.wallets, nonTransferableTokens],
  );

  const [fromValues, setFromValues] = useState<TValues>({
    amount: '',
    amountWithSlippage: '',
    balance: walletList[0]?.chainBalance['2'] || 0,
    coin: walletList[0]?.tokenName || 'KDA',
    address: walletList[0]?.tokenAddress || 'coin',
    precision: 12,
  });

  const [toValues, setToValues] = useState<TValues>({
    amount: '',
    amountWithSlippage: '',
    balance: walletList[1]?.chainBalance['2'] || 0,
    coin: walletList[1]?.tokenName || 'KDX',
    address: walletList[1]?.tokenAddress || 'kaddex.kdx',
    precision: 12,
  });
  const [priceImpact, setPriceImpact] = useState('');

  useEffect(() => {
    const fromWallet = walletList?.find(
      (item: any) => item.tokenAddress === fromValues?.address,
    );
    if (fromWallet) {
      setFromValues(v => ({...v, balance: fromWallet?.chainBalance['2'] || 0}));
    }
    const toWallet = walletList?.find(
      (item: any) => item.tokenAddress === toValues?.address,
    );
    if (toWallet) {
      setToValues(v => ({...v, balance: toWallet?.chainBalance['2'] || 0}));
    }
  }, [toValues?.address, fromValues?.address, walletList]);

  const dispatch = useDispatch();

  useEffect(() => {
    pact.getReserves({
      token0Address: fromValues.address,
      token1Address: toValues.address,
      params: {
        customHost: networkDetail.host,
        network: NetworkName.CUSTOM_NETWORK,
        chainId: 2,
        instance: networkDetail.instance,
        version: networkDetail.version,
      },
    });
  }, [fromValues.address, toValues.address, networkDetail]);

  useEffect(() => {
    if (!isNaN(pact.ratio)) {
      setPriceImpact(
        pact.computePriceImpact(fromValues.amount, toValues.amount).toString(),
      );
    } else {
      setPriceImpact('');
    }
  }, [fromValues.amount, toValues.amount, pact.ratio]);

  useEffect(() => {
    if (!isNaN(pact.ratio)) {
      if (fromValues.amount !== '' && toValues.amount === '') {
        const amountTo = reduceBalance(
          pact.computeOut(fromValues.amount),
          toValues.precision,
        );
        setToValues({
          ...toValues,
          amount: amountTo,
          amountWithSlippage: reduceBalance(
            +amountTo * (1 - pact.slippage),
            toValues.precision,
          ),
        });
      }
      if (fromValues.amount === '' && toValues.amount !== '') {
        const amountFrom = reduceBalance(
          pact.computeIn(toValues.amount),
          fromValues.precision,
        );
        setFromValues({
          ...fromValues,
          amount: amountFrom,
          amountWithSlippage: reduceBalance(
            +amountFrom * (1 + pact.slippage),
            fromValues.precision,
          ),
        });
      }
      if (fromValues.amount !== '' && toValues.amount !== '') {
        const amountTo = reduceBalance(
          pact.computeOut(fromValues.amount),
          toValues.precision,
        );
        setToValues({
          ...toValues,
          amount: amountTo,
          amountWithSlippage: reduceBalance(
            +amountTo * (1 - pact.slippage),
            toValues.precision,
          ),
        });
      }
    }
  }, [pact.ratio, pact.slippage]);

  const handleSwap = () => {
    const copyFromValues = {...fromValues, amount: ''};
    const copyToValues = {...toValues, amount: ''};
    setToValues(copyFromValues);
    setFromValues(copyToValues);
  };

  const [showConfirmationPopup, setShowConfirmationPopup] =
    useState<boolean>(false);

  const createConfirmModal = useCallback(() => {
    setShowConfirmationPopup(true);
  }, []);

  const hideConfirmModal = useCallback(
    () => setShowConfirmationPopup(false),
    [],
  );

  const onConfirmSwap = useCallback(() => {
    setShowConfirmationPopup(false);

    Toast.show({
      type: 'info',
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      text1: 'Swap submitted!',
      text2: 'You can see the result in the activities tab',
      topOffset: statusBarHeight + 16,
    });

    dispatch(
      swapRequest({
        instance: networkDetail.instance,
        version: networkDetail.version,
        chainId: '2',
        customHost: networkDetail.host,
        publicKey: selectedAccount.publicKey,
        signature: selectedAccount.privateKey,
        token0Amount: +fromValues.amount,
        token1Amount: +toValues.amount,
        token0AmountWithSlippage: +fromValues.amountWithSlippage,
        token1AmountWithSlippage: +toValues.amountWithSlippage,
        token0Address: fromValues.address,
        token1Address: toValues.address,
        token0Coin: fromValues.coin,
        token1Coin: toValues.coin,
        accountName: selectedAccount.accountName,
        isSwapIn: true,
        network: networkDetail.network,
        gasStationEnabled: pact.enableGasStation,
        gasPrice: +pact.gasConfiguration.gasPrice,
        gasLimit: +pact.gasConfiguration.gasLimit,
        ttl: +pact.ttl,
      }),
    );
  }, [fromValues, toValues, pact, networkDetail, selectedAccount]);

  if (networkDetailFetching) {
    return (
      <View style={styles.loadingWrapper}>
        <View style={styles.loading}>
          <ActivityIndicator color={MAIN_COLOR} size="small" />
        </View>
      </View>
    );
  }
  return (
    <>
      <ScrollView>
        {isSwapping ? (
          <View style={styles.loadingWrapper}>
            <View style={styles.loading}>
              <ActivityIndicator color={MAIN_COLOR} size="small" />
            </View>
            <Text style={styles.loadingText}>{'Transaction pending...'}</Text>
          </View>
        ) : null}
        <View style={styles.container}>
          <View style={styles.warningContainer}>
            <Warning title="To use our convert functionality, first, make sure to have funds on Chain 2." />
          </View>
          <CurrencyInput
            title="GIVE"
            selectedToken={fromValues}
            setSelectedToken={setFromValues}
            walletList={walletList}
            anotherToken={toValues}
            setAnotherToken={setToValues}
          />
          <View style={styles.swapLine}>
            <TouchableOpacity onPress={handleSwap} style={styles.swapIcon}>
              <SwapSvg fill="grey" width={30} height={30} />
            </TouchableOpacity>
          </View>
          <CurrencyInput
            title="RECEIVE"
            selectedToken={toValues}
            setSelectedToken={setToValues}
            walletList={walletList}
            anotherToken={fromValues}
            disabled={true}
            setAnotherToken={setFromValues}
          />
          <Info
            priceImpact={priceImpact}
            firstToken={fromValues}
            secondToken={toValues}
          />
          <Button
            disabled={!fromValues.amount || networkDetailFetching || isSwapping}
            style={styles.button}
            onPress={createConfirmModal}
            title="CONFIRM"
          />
        </View>
        <Text style={styles.poweredBy}>Powered by Kaddex</Text>
      </ScrollView>
      <ConfirmModal
        isVisible={showConfirmationPopup}
        close={hideConfirmModal}
        priceImpact={priceImpact}
        firstToken={fromValues}
        secondToken={toValues}
        onConfirm={onConfirmSwap}
      />
    </>
  );
};

export default React.memo(SwapBlock);
