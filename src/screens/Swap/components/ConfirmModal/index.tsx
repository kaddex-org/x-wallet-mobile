import React, {FC} from 'react';
import {Text, View} from 'react-native';

import Modal from '../../../../components/Modal';
import {styles} from './styles';
import {TConfirmModal} from './types';
import Info from '../Info';
import Button from '../../../Wallet/components/WalletBalance/components/Button';

const ConfirmModal: FC<TConfirmModal> = ({
  isVisible,
  close,
  priceImpact,
  firstToken,
  secondToken,
  onConfirm,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      close={close}
      title="Convert Confirmation"
      contentStyle={styles.content}>
      <View style={styles.container}>
        <Text style={styles.title}>GIVE</Text>
        <Text
          style={
            styles.value
          }>{`${firstToken.amount} ${firstToken.coin}`}</Text>
        <Text style={styles.title}>RECEIVE</Text>
        <Text
          style={
            styles.value
          }>{`${secondToken.amount} ${secondToken.coin}`}</Text>
        <Info
          withMoreInfo={true}
          firstToken={firstToken}
          secondToken={secondToken}
          priceImpact={priceImpact}
        />
        <Button style={styles.button} onPress={onConfirm} title="CONFIRM" />
      </View>
    </Modal>
  );
};

export default ConfirmModal;
