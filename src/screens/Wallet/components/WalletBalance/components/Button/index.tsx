import {TouchableOpacity, Text} from 'react-native';
import React, {FC} from 'react';
import {TButtonProps} from './types';
import {styles} from './styles';

const Button: FC<TButtonProps> = React.memo(
  ({title, icon, backgroundColor, style, textColor, onPress, disabled}) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.button,
          style,
          backgroundColor ? {backgroundColor: backgroundColor} : {},
          {opacity: disabled ? 0.5 : 1},
        ]}>
        {icon}
        <Text style={[styles.text, textColor ? {color: textColor} : {}]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default Button;
