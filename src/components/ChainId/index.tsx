import React, {FC, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {TChainIdProps} from './types';
import Dropdown from '../Dropdown';

const ChainId: FC<TChainIdProps> = React.memo(
  ({wrapperStyle, label, errorMessage, ...props}) => {
    const [open, setOpen] = useState(false);
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={styles.label}>{label || 'Chain id'}</Text>
        <Dropdown
          placeholder="Chain ID"
          containerStyle={styles.dropdownContainer}
          style={styles.dropdownStyle}
          placeholderStyle={styles.dropdownPlaceholder}
          labelStyle={styles.dropdownLabel}
          {...props}
          open={open}
          setOpen={setOpen}
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    );
  },
);

export default ChainId;
