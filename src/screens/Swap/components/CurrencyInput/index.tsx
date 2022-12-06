import React, {FC, useCallback, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Input from '../../../../components/Input';
import ChevronRightSvg from '../../../../assets/images/chevron-right.svg';
import {makeSelectIsSwapping} from '../../../../store/transfer/selectors';
import {makeSelectUsdEquivalents} from '../../../../store/userWallet/selectors';
import {useShallowEqualSelector} from '../../../../store/utils';
import {styles} from './styles';
import {TCurrencyInputProps} from './types';
import noExponents from '../../../../utils/noExponents';
import {
  humanReadableNumber,
  limitDecimalPlaces,
  reduceBalance,
} from '../../../../utils/numberHelpers';
import {usePactContext} from '../../../../contexts';
import {debounce, throttle} from 'throttle-debounce';
import {getAssetImageView} from '../../../../utils/getAssetImageView';
import SelectTokenModal from '../SelectTokenModal';
import {decimalI4fNeeded} from '../../../../utils/stringHelpers';

const CurrencyInput: FC<TCurrencyInputProps> = ({
  walletList,
  selectedToken,
  setSelectedToken,
  anotherToken,
  title,
  setAnotherToken,
  disabled,
}) => {
  const usdEquivalents = useShallowEqualSelector(makeSelectUsdEquivalents);
  const [isSelectCoinModalVisible, setSelectCoinModalVisible] = useState(false);
  const isSwapping = useShallowEqualSelector(makeSelectIsSwapping);
  const pact = usePactContext();

  const closeSelectCoinModal = useCallback(() => {
    setSelectCoinModalVisible(false);
  }, []);

  const tokenUsdPrice = useMemo(() => {
    const res = usdEquivalents.reduce(
      (acc: any, curr: {token: string; usd: string}) => {
        acc[curr.token] = curr.usd;
        return acc;
      },
      {},
    );
    return res;
  }, [usdEquivalents]);

  const handleCoinSelectBtnClick = useCallback(() => {
    setSelectCoinModalVisible(true);
  }, []);

  const safeSetFrom = (value: string) => {
    if (pact.computeIn(value) <= 0) {
      setAnotherToken({
        ...anotherToken,
        amount: '0',
        amountWithSlippage: '0',
      });
    } else {
      setAnotherToken({
        ...anotherToken,
        amount: reduceBalance(pact.computeIn(value), anotherToken.precision),
        amountWithSlippage: reduceBalance(
          +pact.computeIn(value) * (1 - pact.slippage),
          anotherToken.precision,
        ),
      });
    }
  };

  const handleChange = (value: string) => {
    value = limitDecimalPlaces(
      value.replace(',', '.'),
      anotherToken.precision,
    ).toString();

    setSelectedToken(prev => ({
      ...prev,
      amount: value,
      amountWithSlippage: reduceBalance(
        +value * (1 + pact.slippage),
        selectedToken.precision,
      ),
    }));

    if (!isNaN(Number(value))) {
      if (value !== '') {
        if (
          selectedToken.coin !== '' &&
          anotherToken.coin !== '' &&
          !isNaN(1) // pact.ratio
        ) {
          const amount = reduceBalance(
            pact.computeOut(value),
            anotherToken.precision,
          );
          if (value.length < 5) {
            setAnotherToken({
              ...anotherToken,
              amount,
              amountWithSlippage: reduceBalance(
                +amount * (1 - pact.slippage),
                anotherToken.precision,
              ),
            });
            if (title === 'RECEIVE') {
              throttle(500, () => safeSetFrom(value));
            }
          } else {
            setAnotherToken({
              ...anotherToken,
              amount: Number(amount).toFixed(anotherToken.precision),
              amountWithSlippage: reduceBalance(
                +Number(amount).toFixed(anotherToken.precision) *
                  (1 - pact.slippage),
                anotherToken.precision,
              ),
            });
            if (title === 'RECEIVE') {
              debounce(500, () => safeSetFrom(value));
            }
          }
        }
      }
      if (value === '') {
        setAnotherToken(prev => ({
          ...prev,
          amount: '',
          amountWithSlippage: '',
        }));
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftBlock}>
          <Text style={styles.title}>{title}</Text>
          <Input
            editable={!disabled && !isSwapping}
            placeholderTextColor="gray"
            keyboardType="numeric"
            placeholder="0.00"
            maxLength={13}
            value={noExponents(selectedToken.amount)}
            style={styles.input}
            wrapperStyle={styles.inputWrapper}
            onChangeText={handleChange}
          />
          {+selectedToken.amount > 0 && (
            <Text style={styles.usd}>
              ${' '}
              {humanReadableNumber(
                (tokenUsdPrice[selectedToken.address] || 0) *
                  Number(selectedToken.amount),
              ) || 0}
            </Text>
          )}
        </View>
        <View style={styles.rightBlock}>
          <Text style={styles.balance}>
            {`Balance: ${decimalI4fNeeded(selectedToken.balance)}`}
          </Text>
          <TouchableOpacity
            onPress={handleCoinSelectBtnClick}
            style={styles.tokenSelect}>
            {getAssetImageView(selectedToken.address, 25)}
            <Text style={styles.coinTitle}>{selectedToken.coin}</Text>
            <ChevronRightSvg fill="#000" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <SelectTokenModal
        title={title}
        anotherToken={anotherToken}
        selectedToken={selectedToken}
        setSelectedToken={setSelectedToken}
        walletList={walletList}
        isVisible={isSelectCoinModalVisible}
        close={closeSelectCoinModal}
      />
    </>
  );
};

export default CurrencyInput;
