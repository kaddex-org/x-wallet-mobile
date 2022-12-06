import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {TCardProps} from './types';
import {styles} from './styles';

const Card: FC<TCardProps> = React.memo(
  ({isFirstItem, text, title, titleStyle, icon, onPress}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.wrapper, isFirstItem && {borderTopWidth: 0}]}
        onPress={onPress}>
        {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
        <View style={icon ? styles.rightSide : styles.rightSideWithoutIcon}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

export default Card;
