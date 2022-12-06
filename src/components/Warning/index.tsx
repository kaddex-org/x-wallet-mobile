import React, {FC} from 'react';
import {Text, View} from 'react-native';

import AlertCircleSvg from '../../assets/images/alert-circle.svg';
import {TWarningProps} from './types';
import {styles} from './styles';

const Warning: FC<TWarningProps> = React.memo(({title, text}) => {
  return (
    <View style={styles.wrapper}>
      <AlertCircleSvg />
      <View style={styles.textWrapper}>
        {title && <Text style={styles.title}>{title}</Text>}
        {text && <Text style={styles.title}>{text}</Text>}
      </View>
    </View>
  );
});

export default Warning;
