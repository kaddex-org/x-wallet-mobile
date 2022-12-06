import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {TWalletConnectHelpProps} from './types';
import {styles} from './styles';
import FooterButton from '../FooterButton';

const WalletConnectHelpModal: FC<TWalletConnectHelpProps> = React.memo(
  props => {
    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text style={styles.text1}>
            {
              'If Kaddex website is opened on this device and you are having trouble with WalletConnect connection, try to go back to the web browser and come back'
            }
          </Text>
          <Text style={styles.text2}>
            {
              "If this doesn't help, please check WalletConnect settings or try to open Kaddex website on desktop browser"
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

export default WalletConnectHelpModal;
