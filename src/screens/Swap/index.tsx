import React, {useCallback, useState} from 'react';
import {Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import SettingModal from './components/SettingModal';
import SwapBlock from './components/SwapBlock';
import {styles} from './styles';
import GasSettingSvg from '../../assets/images/gas_station.svg';
import BasicSettingSvg from '../../assets/images/basic-settins.svg';
import GasSettingModal from './components/GasSettingModal';
import Header from './components/Header';
import {headerTabs} from './const';

const Swap = () => {
  const [activeTab, setActiveTab] = useState(headerTabs[0].value);

  const [isGasSettingModalVisible, setGasSettingModalVisible] = useState(false);
  const [isSettingModal, setSettingModal] = useState(false);

  const toggleGasSettingModal = useCallback(() => {
    setGasSettingModalVisible(prev => !prev);
  }, [isGasSettingModalVisible]);

  const toggleSettingModal = useCallback(() => {
    setSettingModal(prev => !prev);
  }, [isSettingModal]);

  return (
    <TouchableOpacity
      style={styles.screen}
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      accessible={false}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
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
        <GasSettingSvg width={24} height={24} />
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
