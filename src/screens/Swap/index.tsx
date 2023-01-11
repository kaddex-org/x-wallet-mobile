import React, {useCallback, useState} from 'react';
import {Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import SettingModal from './components/SettingModal';
import SwapBlock from './components/SwapBlock';
import {styles} from './styles';
import GasSettingSvg from '../../assets/images/gas_station.svg';
import BasicSettingSvg from '../../assets/images/basic-settins.svg';
import GasSettingModal from './components/GasSettingModal';
import {usePactContext} from '../../contexts';

const Swap = () => {
  const [isGasSettingModalVisible, setGasSettingModalVisible] = useState(false);
  const [isSettingModal, setSettingModal] = useState(false);

  const toggleGasSettingModal = useCallback(() => {
    setGasSettingModalVisible(!isGasSettingModalVisible);
  }, [isGasSettingModalVisible]);

  const toggleSettingModal = useCallback(() => {
    setSettingModal(!isSettingModal);
  }, [isSettingModal]);

  const pact = usePactContext();

  return (
    <TouchableOpacity
      style={styles.screen}
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      accessible={false}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          <SwapBlock />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        onPress={toggleGasSettingModal}
        activeOpacity={0.8}
        style={styles.gasButton}>
        <GasSettingSvg
          fill={pact?.enableGasStation ? '#41cc41' : '#787B8E'}
          width={24}
          height={24}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleSettingModal}
        activeOpacity={0.8}
        style={styles.settingsButton}>
        <BasicSettingSvg width={24} height={24} />
      </TouchableOpacity>
      <GasSettingModal
        isVisible={isGasSettingModalVisible}
        toggle={toggleGasSettingModal}
      />
      <SettingModal isVisible={isSettingModal} close={toggleSettingModal} />
    </TouchableOpacity>
  );
};

export default Swap;
