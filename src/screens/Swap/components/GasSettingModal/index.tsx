import React, {FC, useEffect, useMemo, useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {styles} from './styles';
import Modal from '../../../../components/Modal';
import Input from '../../../../components/Input';
import RadioButtons from './RadioButtons';
import {commonColors, MAIN_COLOR} from '../../../../constants/styles';
import {usePactContext} from '../../../../contexts';
import {GAS_OPTIONS} from '../../../../constants';
import {getDecimalPlaces} from '../../../../utils/numberHelpers';
import {TGasSettingModalProps, TSpeed} from './types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {bottomSpace} from '../../../../utils/deviceHelpers';
import ToggleSwitch from 'toggle-switch-react-native';

const speedValues: TSpeed[] = ['low', 'normal', 'fast'];

const GasSettingModal: FC<TGasSettingModalProps> = ({isVisible, toggle}) => {
  const pact = usePactContext();
  const [speed, setSpeed] = useState<TSpeed>('low');

  useEffect(() => {
    if (!pact.enableGasStation) {
      pact.setGasConfiguration(GAS_OPTIONS.low.SWAP);
      setSpeed('low');
    }
  }, [pact.enableGasStation, pact.setGasConfiguration]);

  useEffect(() => {
    if (!pact.enableGasStation && pact.networkGasData.networkCongested) {
      handleSuggestedPrice(speed);
    }
  }, [
    speed,
    pact.networkGasData.networkCongested,
    pact.networkGasData.suggestedGasPrice,
    pact.networkGasData.highestGasPrice,
    pact.networkGasData.lowestGasPrice,
  ]);

  const handleSuggestedPrice = (type: TSpeed) => {
    let networkGas =
      type === 'low'
        ? pact.networkGasData.lowestGasPrice
        : type === 'normal'
        ? pact.networkGasData.suggestedGasPrice
        : pact.networkGasData.highestGasPrice;

    pact.networkGasData.networkCongested &&
    networkGas > GAS_OPTIONS[type].SWAP.gasPrice
      ? pact.handleGasConfiguration('gasPrice', networkGas.toString())
      : pact.setGasConfiguration(GAS_OPTIONS[type].SWAP);
  };

  const toggleSwitch = () =>
    pact.setEnableGasStation(previousState => !previousState);

  const color = useMemo(() => {
    return pact.gasConfiguration?.gasPrice * pact.gasConfiguration?.gasLimit >
      0.5
      ? commonColors.error
      : pact.gasConfiguration?.gasPrice * pact.gasConfiguration?.gasLimit <=
          0.5 &&
        pact.gasConfiguration?.gasPrice * pact.gasConfiguration?.gasLimit > 0.01
      ? commonColors.orange
      : commonColors.green;
  }, [pact.gasConfiguration?.gasPrice, pact.gasConfiguration?.gasLimit]);

  return (
    <Modal isVisible={isVisible} close={toggle} title="Gas Settings">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.gasStation}>GAS STATION</Text>
          <ToggleSwitch
            isOn={pact.enableGasStation}
            onColor={MAIN_COLOR}
            onToggle={toggleSwitch}
          />
        </View>
        {!pact.enableGasStation ? (
          <>
            <Input
              keyboardType="numeric"
              maxLength={10}
              label="Gas Limit"
              placeholder="Gas Limit"
              autoCapitalize="none"
              wrapperStyle={styles.inputWrapper}
              onChangeText={value =>
                pact.handleGasConfiguration('gasLimit', value)
              }
              value={pact.gasConfiguration?.gasLimit.toString()}
            />
            <Input
              maxLength={10}
              keyboardType="numeric"
              label="Gas Price"
              placeholder="Gas Price"
              autoCapitalize="none"
              wrapperStyle={styles.inputWrapper}
              onChangeText={value =>
                pact.handleGasConfiguration('gasPrice', value)
              }
              value={pact.gasConfiguration?.gasPrice.toString()}
            />
            <RadioButtons<TSpeed>
              options={speedValues}
              value={speed}
              setValue={setSpeed}
            />
            <View style={styles.info}>
              <Text style={styles.title}>
                Potential gas cost for transaction failure:
              </Text>
              <Text style={[styles.value, {color}]}>
                {getDecimalPlaces(
                  pact.gasConfiguration?.gasPrice *
                    pact.gasConfiguration?.gasLimit,
                )}{' '}
                KDA
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.title}>
            No gas cost - subsidized by Kaddex through Kadena gas stations.
          </Text>
        )}
        {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-bottomSpace} />}
      </View>
    </Modal>
  );
};

export default React.memo(GasSettingModal);
