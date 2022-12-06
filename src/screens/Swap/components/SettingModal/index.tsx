import React, {FC} from 'react';
import {View, TextInput, Text, Platform} from 'react-native';
import {usePactContext} from '../../../../contexts';
import RadioButtons from '../GasSettingModal/RadioButtons';

import Modal from '../../../../components/Modal';
import {styles} from './styles';
import {TSettingModal} from './types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {bottomSpace} from '../../../../utils/deviceHelpers';

const slippageTolerances = ['0.1', '0.5', '1'];

const SettingModal: FC<TSettingModal> = ({isVisible, close}) => {
  const {slippage, setSlippage, ttl, setTtl} = usePactContext();

  const handleSlippageChange = (value: string) => {
    value = value.replace(',', '.');
    if (value.split('.')[1]) {
      value = (+value).toFixed(1);
    }
    setSlippage(+value > 100 ? 1 : +value / 100);
  };

  const handleDeadlineChange = (value: string) => {
    value = value.replace(/^[0-9]g/, '');
    if (+value <= 60) {
      setTtl(+value * 60);
    }
  };

  const setSlippageTolerance = (val: string) => {
    setSlippage(+val / 100);
  };

  return (
    <Modal isVisible={isVisible} close={close} title="Transaction Settings">
      <View style={styles.container}>
        <Text style={styles.title}>Slippage Tolerance</Text>
        <View style={styles.slippageToleranceContainer}>
          <RadioButtons<string>
            prefix="%"
            options={slippageTolerances}
            value={(slippage * 100).toString()}
            setValue={setSlippageTolerance}
          />
          <View>
            <TextInput
              keyboardType="numeric"
              onChangeText={handleSlippageChange}
              style={styles.input}
              value={(slippage * 100).toString()}
            />
            <Text style={styles.percent}>%</Text>
          </View>
        </View>
        <Text style={styles.title}>Transaction Deadline</Text>
        <View style={styles.deadlineWrapper}>
          <TextInput
            keyboardType="numeric"
            onChangeText={handleDeadlineChange}
            style={styles.input}
            value={(ttl / 60).toString()}
          />
          <Text style={styles.text}>minutes</Text>
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-bottomSpace} />}
      </View>
    </Modal>
  );
};

export default SettingModal;
