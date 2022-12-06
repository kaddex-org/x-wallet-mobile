import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {TTabButtonProps} from './types';
import {styles} from './styles';

const TabButton: FC<TTabButtonProps> = React.memo(
  ({isActive, title, onPress, buttonStyle}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.button,
          buttonStyle && buttonStyle,
          isActive && styles.activeButton,
        ]}>
        <Text style={[styles.text, isActive && styles.activeText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default TabButton;
