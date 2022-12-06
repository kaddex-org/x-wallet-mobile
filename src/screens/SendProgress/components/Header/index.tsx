import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

const Header = React.memo(() => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Transaction is in progress</Text>
    </View>
  );
});

export default Header;
