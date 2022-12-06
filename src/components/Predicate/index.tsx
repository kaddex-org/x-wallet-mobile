import React, {FC, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {TPredicateProps} from './types';
import Dropdown from '../Dropdown';

const Predicate: FC<TPredicateProps> = React.memo(
  ({wrapperStyle, errorMessage, ...props}) => {
    const [open, setOpen] = useState(false);
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={styles.label}>Predicate</Text>
        <Dropdown
          placeholder="Predicate"
          containerStyle={styles.dropdownContainer}
          style={styles.dropdownStyle}
          placeholderStyle={styles.dropdownPlaceholder}
          labelStyle={styles.dropdownLabel}
          {...props}
          multiple={false}
          open={open}
          setOpen={setOpen}
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    );
  },
);

export default Predicate;
