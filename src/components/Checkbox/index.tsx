import React, {FC} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {TCheckboxProps} from './types';
import {styles} from './styles';

const Checkbox: FC<TCheckboxProps> = React.memo(
  ({textStyle, iconStyle, textContainerStyle, ...props}) => {
    return (
      <BouncyCheckbox
        size={26}
        fillColor="#404A8D"
        text="title"
        iconStyle={[styles.iconStyle, iconStyle]}
        textStyle={[styles.textStyle, textStyle]}
        textContainerStyle={[styles.textContainerStyle, textContainerStyle]}
        {...props}
      />
    );
  },
);

export default Checkbox;
