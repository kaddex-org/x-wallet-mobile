import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {TAccountItemProps} from './types';
import WalletItem from '../../../../components/WalletItem';

const AccountItem: FC<TAccountItemProps> = React.memo(
  ({isFirst, onPress, ...restProps}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.wrapper, isFirst && styles.noBorder]}
        onPress={onPress}>
        <WalletItem textStyle={styles.accountLabel} {...restProps} />
      </TouchableOpacity>
    );
  },
);

export default AccountItem;
