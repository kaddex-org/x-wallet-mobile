import React, {FC} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {TFooterButtonProps} from './types';

const FooterButton: FC<TFooterButtonProps> = React.memo(
  ({title, style, onPress, disabled}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.btn, disabled && styles.disabledBtn, style]}
        disabled={disabled}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  },
);

export default FooterButton;
