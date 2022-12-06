import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

import {TCardProps} from './types';

const Card: FC<TCardProps> = React.memo(
  ({disabled, title, description, icon, onPress}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.wrapper, disabled && styles.halfOpacity]}
        disabled={disabled}
        onPress={onPress}>
        {icon}
        <View style={styles.side}>
          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.desc}>{description}</Text> : null}
        </View>
      </TouchableOpacity>
    );
  },
);

export default Card;
