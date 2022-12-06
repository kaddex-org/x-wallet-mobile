import React, {FC} from 'react';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import Settings from '../Settings';
import {styles} from './styles';
import {TContentType} from './types';
import {cutStr} from '../../../../utils/stringHelpers';

const Content: FC<TContentType> = React.memo(props => {
  const {predicate, receiverPublicKey} = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={styles.contentWrapper}>
      <View style={styles.header}>
        <Text style={[styles.text, styles.headerTitle]}>
          Advanced Settings (Optional)
        </Text>
        <Settings {...props} />
      </View>
      {predicate ? (
        <View style={styles.itemWrapper}>
          <View style={styles.item}>
            <Text style={[styles.text, styles.kda]}>{predicate || ''}</Text>
            <Text style={[styles.text, styles.usd]}>{'Predicate'}</Text>
          </View>
        </View>
      ) : null}
      {receiverPublicKey ? (
        <View style={styles.itemWrapper}>
          <View style={styles.item}>
            <Text style={[styles.text, styles.kda]}>
              {cutStr(receiverPublicKey || '')}
            </Text>
            <Text style={[styles.text, styles.usd]}>
              {'Receiver Public Key'}
            </Text>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
});

export default Content;
