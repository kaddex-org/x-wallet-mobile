import React, {FC} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {styles} from './styles';
import {TListItemProps} from './types';

const ListItem: FC<TListItemProps> = React.memo(
  ({icon, text, onPress, style, textStyle, disabled}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={[styles.wrapper, style]}>
        {icon || null}
        <Text style={[styles.text, textStyle, !icon && {marginLeft: 0}]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default ListItem;
