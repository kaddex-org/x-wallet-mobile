import React, {FC, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import BasicCopySvg from '../../../../assets/images/basic-copy.svg';
import {TListItemProps} from './types';

import {styles} from './styles';
import Snackbar from 'react-native-snackbar';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ListItem: FC<TListItemProps> = React.memo(({title, text}) => {
  const copyToClipboard = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    Clipboard.setString(text);
    Snackbar.show({
      text: 'Copied to clipboard!',
      duration: Snackbar.LENGTH_SHORT,
    });
  }, []);
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={copyToClipboard}>
          <BasicCopySvg />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text onPress={copyToClipboard} style={styles.text}>
          {text}
        </Text>
      </View>
    </View>
  );
});

export default ListItem;
