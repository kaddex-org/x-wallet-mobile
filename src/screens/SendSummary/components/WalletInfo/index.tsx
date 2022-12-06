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

const WalletInfo = () => {
  const dispatch = useDispatch();

  const gatheredInfo = useShallowEqualSelector(makeSelectGatheredInfo);
  const selectedToken = useShallowEqualSelector(makeSelectSelectedToken);
  const usdEquivalents = useSelector(makeSelectUsdEquivalents);
  const estimatedGasFee = useShallowEqualSelector(makeSelectEstimatedGasFee);

  const gasUsdEquivalent = useMemo(() => {
    if (Array.isArray(usdEquivalents)) {
      return usdEquivalents?.find(item => item.token === 'gas')?.usd || 0;
    }
    return 0;
  }, [usdEquivalents]);

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

  const kdaUsdEquivalent = useMemo(() => {
    if (Array.isArray(usdEquivalents)) {
      const foundUsdValue = (usdEquivalents || []).find(
        item => item.token === 'coin',
      );
      return Number(foundUsdValue?.usd || 0);
    }
    return 0;
  }, [usdEquivalents]);

  const handleChangeText = useCallback((text: string) => {
    setInputText(`${text}`);
  }, []);

  const onInputBlur = useCallback(() => {
    try {
      if (inputText) {
        const formattedInputText = inputText.replace(',', '.');
        const textBeforeDecimals = formattedInputText.split('.')[0];
        const textAfterDecimals = formattedInputText.split('.')[1];
        if (textAfterDecimals.length > 6) {
          const fixedInputText = `${textBeforeDecimals}.${textAfterDecimals.slice(
            0,
            6,
          )}`;
          setInputText(fixedInputText);
        } else {
          const amount = inputText.replace(',', '.');
          if (amount <= balance) {
            dispatch(setGatheredTransferInfo({amount}));
          } else {
            setInputText(`${balance}`);
          }
        }
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
    handleChangeText(`${balance / 2}`.replace(',', '.'));
    dispatch(setGatheredTransferInfo({amount: +(balance / 2)}));
  }, [balance]);

  const onMax = useCallback(() => {
    handleChangeText(
      (
        +balance -
        (estimatedGasFee?.gasPrice || 0) *
          (estimatedGasFee?.gasLimit || 0) *
          (kdaUsdEquivalent && gasUsdEquivalent
            ? kdaUsdEquivalent / gasUsdEquivalent
            : 1)
      )
        .toFixed(6)
        .replace(',', '.'),
    );
    dispatch(
      setGatheredTransferInfo({
        amount:
          +balance -
          (estimatedGasFee?.gasPrice || 0) *
            (estimatedGasFee?.gasLimit || 0) *
            (kdaUsdEquivalent && gasUsdEquivalent
              ? kdaUsdEquivalent / gasUsdEquivalent
              : 1),
      }),
    );
    Snackbar.show({
      text: 'Max amount also takes into consideration the estimated gas fee.',
      duration: Snackbar.LENGTH_LONG,
    });
  }, [balance, gasUsdEquivalent, kdaUsdEquivalent, estimatedGasFee]);

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