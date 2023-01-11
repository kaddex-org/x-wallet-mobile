import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {setGatheredTransferInfo} from '../../../../store/transfer';
import {
  makeSelectSelectedToken,
  makeSelectUsdEquivalents,
} from '../../../../store/userWallet/selectors';
import {
  makeSelectEstimatedGasFee,
  makeSelectGatheredInfo,
} from '../../../../store/transfer/selectors';
import {useInputBlurOnKeyboard} from '../../../../utils/keyboardHelpers';
import Snackbar from 'react-native-snackbar';
import {useShallowEqualSelector} from '../../../../store/utils';
import {toFixed} from '../../../../utils/numberHelpers';
import {decimalIfNeeded} from '../../../../utils/stringHelpers';

const WalletInfo = () => {
  const dispatch = useDispatch();

  const gatheredInfo = useShallowEqualSelector(makeSelectGatheredInfo);
  const selectedToken = useShallowEqualSelector(makeSelectSelectedToken);
  const usdEquivalents = useSelector(makeSelectUsdEquivalents);
  const estimatedGasFee = useShallowEqualSelector(makeSelectEstimatedGasFee);

  const inputAmount = useMemo(
    () => gatheredInfo.amount || 0,
    [gatheredInfo?.amount],
  );
  const [inputText, setInputText] = useState<string>('');

  const balance = useMemo(() => {
    if (selectedToken?.chainBalance && gatheredInfo?.chainId) {
      return selectedToken?.chainBalance[gatheredInfo?.chainId];
    }
    return 0;
  }, [selectedToken, gatheredInfo?.chainId]);

  const usdEquivalent = useMemo(() => {
    let usdValue: string = '-';
    const amount = isNaN(Number(inputAmount)) ? 0 : Number(inputAmount);
    if (Array.isArray(usdEquivalents)) {
      const foundUsdValue = (usdEquivalents || []).find(
        item => item.token === selectedToken.tokenAddress,
      );
      usdValue = (amount * (foundUsdValue?.usd || 0)).toFixed(2);
    }
    return usdValue;
  }, [inputAmount, usdEquivalents]);

  const gasFee = useMemo(
    () => (estimatedGasFee?.gasPrice || 0) * (estimatedGasFee?.gasLimit || 0),
    [estimatedGasFee],
  );

  const handleChangeText = useCallback((text: string) => {
    setInputText(`${text}`);
  }, []);

  const onInputBlur = useCallback(() => {
    try {
      if (inputText) {
        const amount = Number(toFixed(inputText.replace(',', '.'), 6));
        if (isNaN(amount)) {
          setInputText('');
        } else {
          if (amount <= balance) {
            setInputText(`${amount}`);
            dispatch(setGatheredTransferInfo({amount}));
          } else {
            setInputText(`${balance}`);
          }
        }
      } else {
        setInputText('');
      }
    } catch (e) {
      setInputText(`${balance}`);
    }
  }, [balance, inputText]);

  useEffect(() => {
    dispatch(setGatheredTransferInfo({amount: 0}));
  }, [dispatch]);

  const inputRef = useRef<any>();
  useInputBlurOnKeyboard(inputRef);

  const onHalf = useCallback(() => {
    let amountValue = balance / 2;
    if (selectedToken?.tokenAddress === 'coin') {
      amountValue -= gasFee;
    }
    const amount = decimalIfNeeded(
      toFixed(`${amountValue}`.replace(',', '.'), 6),
      6,
    );
    setInputText(`${amount}`);
    dispatch(setGatheredTransferInfo({amount}));
  }, [balance, gasFee, selectedToken]);

  const onMax = useCallback(() => {
    let amountValue = balance;
    if (selectedToken?.tokenAddress === 'coin') {
      amountValue -= gasFee;
    }
    const amount = decimalIfNeeded(
      toFixed(`${amountValue}`.replace(',', '.'), 6),
      6,
    );
    setInputText(`${amount}`);
    dispatch(setGatheredTransferInfo({amount}));
    Snackbar.show({
      text: 'Max amount also takes into consideration the estimated gas fee.',
      duration: Snackbar.LENGTH_LONG,
    });
  }, [balance, selectedToken, gasFee]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.headerLeftText]}>
          Amount to send
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onHalf}
            style={styles.headerRightTextWrapper}>
            <Text style={[styles.headerText, styles.headerRightText]}>
              half
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onMax}
            style={styles.headerRightTextWrapper}>
            <Text style={[styles.headerText, styles.headerRightText]}>max</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          ref={inputRef}
          keyboardType="numeric"
          placeholder="0"
          style={[styles.mainText, styles.input]}
          value={inputText.toString()}
          blurOnSubmit={true}
          onEndEditing={onInputBlur}
          onSubmitEditing={onInputBlur}
          onBlur={onInputBlur}
          onChangeText={handleChangeText}
        />
        <Text style={styles.mainText}>{selectedToken?.tokenName || ''}</Text>
      </View>
      <View style={styles.footer}>
        <Text
          style={[
            styles.footerText,
            styles.footerLeftText,
          ]}>{`${usdEquivalent} USD`}</Text>
        <Text style={[styles.footerText, styles.footerRightText]}>
          {`Balance: ${(Number(balance) || 0).toFixed(3)} ${
            selectedToken?.tokenName || ''
          }`}
        </Text>
      </View>
    </View>
  );
};

export default WalletInfo;
