import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {styles} from './styles';

const Preloader = React.memo(() => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator color="#FFFFFF" size="large" />
    </View>
  );
});

export default Preloader;
