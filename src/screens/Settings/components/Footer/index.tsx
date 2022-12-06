import React, {FC} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import packageJson from '../../../../../package.json';
import GlobeSvg from '../../../../assets/images/globe.svg';
import {styles} from './styles';

const Footer: FC = React.memo(() => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{`X-Wallet ${packageJson.version}`}</Text>
      <Text style={styles.text}>The evolution of DeFi on Kadena</Text>
      <View style={styles.tipsWrapper}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://kaddex.com/')}
          activeOpacity={0.8}
          style={styles.tip}>
          <GlobeSvg width="24" height="24" />
          <Text style={styles.tipTitle}>Visit our website</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default Footer;
