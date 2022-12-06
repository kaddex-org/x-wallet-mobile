import React, {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {TTopHeaderProps} from './types';

const TopHeader: FC<TTopHeaderProps> = ({children}) => {
  return <View style={styles.wrapper}>{children}</View>;
};

export default TopHeader;
