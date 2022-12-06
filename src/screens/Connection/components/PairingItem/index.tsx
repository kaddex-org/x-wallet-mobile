import React, {FC, useMemo} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {TPairingItemProps} from './types';
import TrashEmptySvg from '../../../../assets/images/trash-empty.svg';
import {styles} from './styles';
import {formatDate, truncate} from '../../../../utils/stringHelpers';

const PairingItem: FC<TPairingItemProps> = React.memo(
  ({item: pairingItem, onDelete}) => {
    const {logo, name, url, expiry} = pairingItem;

    const expireDate = useMemo(() => {
      if (expiry) {
        return new Date(expiry * 1000);
      }
      return null;
    }, [expiry]);

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.rightSide}>
            {logo ? (
              <View style={styles.iconWrapper}>
                <Image
                  source={{uri: logo}}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ) : null}
            <View style={styles.center}>
              <Text style={styles.title}>{name}</Text>
              {url ? (
                <Text style={styles.link}>
                  {truncate(url?.split('https://')[1] ?? 'Unknown', 23)}
                </Text>
              ) : null}
              {expireDate ? (
                <Text style={styles.dateTitle}>{'Expiry:'}</Text>
              ) : null}
              {expireDate ? (
                <Text style={styles.date}>{`${formatDate(expireDate)}`}</Text>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            hitSlop={{
              bottom: 12,
              top: 12,
              right: 12,
              left: 12,
            }}
            activeOpacity={0.8}
            onPress={onDelete}
            style={styles.delete}>
            <TrashEmptySvg width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default PairingItem;
