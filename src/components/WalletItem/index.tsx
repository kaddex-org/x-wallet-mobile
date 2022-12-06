import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';
import {TWalletItemProps} from './types';
import {cutStr} from '../../utils/stringHelpers';

const WalletItem: FC<TWalletItemProps> = React.memo(
  ({name, imageUri, textStyle}) => {
    return (
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          source={
            imageUri
              ? {uri: imageUri}
              : require('../../assets/images/walletProfile.png')
          }
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={[styles.text, textStyle]}>
          {cutStr(name)}
        </Text>
      </View>
    );
  },
);

export default WalletItem;
