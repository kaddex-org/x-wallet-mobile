import React, {FC} from 'react';
import {View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import Modal from '../../components/Modal';
import ListItem from './components/ListItem';
import {TReceiveKDAModalProps} from './types';

import {styles} from './styles';
import {makeSelectSelectedAccount} from '../../store/userWallet/selectors';
import {useShallowEqualSelector} from '../../store/utils';

const ReceiveKDAModal: FC<TReceiveKDAModalProps> = React.memo(
  ({close, isVisible}) => {
    const selectedAccount = useShallowEqualSelector(makeSelectSelectedAccount);
    return (
      <Modal isVisible={isVisible} close={close} title="Receive tokens">
        <View style={styles.modalContainer}>
          <View style={styles.qrCodeWrapper}>
            <QRCode value={selectedAccount?.accountName} size={200} />
          </View>
          <ListItem
            text={selectedAccount?.accountName || ''}
            title="Your account name"
          />
          <ListItem
            text={selectedAccount?.publicKey || ''}
            title="Your Public key"
          />
        </View>
      </Modal>
    );
  },
);

export default ReceiveKDAModal;
