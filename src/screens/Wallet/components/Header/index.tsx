import React, {useCallback} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import ArrowDownSvg from '../../../../assets/images/arrow-down.svg';
import MoreVerticalSvg from '../../../../assets/images/more-vertical.svg';
import WalletItem from '../../../../components/WalletItem';

import {styles} from './styles';
import {makeSelectActiveNetwork} from '../../../../store/networks/selectors';
import WalletSelectorModal from '../../../../modals/WalletSelectorModal';
import {makeSelectSelectedAccount} from '../../../../store/userWallet/selectors';
import {cutStr} from '../../../../utils/stringHelpers';
import NetworkSelectorModal from '../../../../modals/NetworkSelectorModal';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useShallowEqualSelector} from '../../../../store/utils';

const Header = React.memo(() => {
  const account = useShallowEqualSelector(makeSelectSelectedAccount);
  const activeNetwork = useShallowEqualSelector(makeSelectActiveNetwork);

  const [isWalletModalVisible, setWalletModalVisible] = React.useState(false);
  const [isNetworkModalVisible, setNetworkModalVisible] = React.useState(false);

  const toggleNetworkModal = useCallback(() => {
    setNetworkModalVisible(!isNetworkModalVisible);
  }, [isNetworkModalVisible]);

  const toggleWalletModal = useCallback(() => {
    setWalletModalVisible(!isWalletModalVisible);
  }, [isWalletModalVisible]);

  const onPressAccount = useCallback(() => {
    if (account) {
      ReactNativeHapticFeedback.trigger('impactMedium', {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: false,
      });
      Clipboard.setString(account.accountName || '');
      Snackbar.show({
        text: 'Account name copied to clipboard!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [account]);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={toggleNetworkModal}>
        <Text style={styles.buttonText}>{activeNetwork?.name || ''}</Text>
        <ArrowDownSvg />
      </TouchableOpacity>
      <View style={styles.rightSide}>
        <View style={styles.accountButton}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressAccount}>
            <WalletItem name={cutStr(account?.accountName || '')} />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{bottom: 16, top: 16, left: 16, right: 16}}
            onPress={toggleWalletModal}
            activeOpacity={0.8}
            style={styles.iconWrapper}>
            <MoreVerticalSvg />
          </TouchableOpacity>
        </View>
      </View>
      <WalletSelectorModal
        isVisible={isWalletModalVisible}
        toggle={toggleWalletModal}
      />
      <NetworkSelectorModal
        isVisible={isNetworkModalVisible}
        toggle={toggleNetworkModal}
      />
    </View>
  );
});

export default Header;
