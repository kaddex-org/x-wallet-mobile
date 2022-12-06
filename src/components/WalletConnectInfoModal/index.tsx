import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {TWalletConnectInfoProps} from './types';
import {styles} from './styles';
import FooterButton from '../FooterButton';

const WalletConnectInfoModal: FC<TWalletConnectInfoProps> = React.memo(
  props => {
    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text style={styles.text1}>
            {
              'All active sessions will remain active until they are manually terminated by delete action'
            }
          </Text>
          <Text style={styles.text2}>
            {
              'History tab shows details about session with given permissions for methods and events'
            }
          </Text>
          <FooterButton
            style={styles.button}
            title={'Okay'}
            onPress={props.onConfirm}
          />
        </View>
      </View>
    );
  },
);

export default WalletConnectInfoModal;
