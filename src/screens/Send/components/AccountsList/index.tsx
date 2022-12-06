import React, {FC, useCallback} from 'react';
import {View, Text} from 'react-native';
import {TAccountsListProps} from './types';
import {styles} from './styles';
import AccountItem from '../AccountItem';
import {TAccount} from '../../../../store/userWallet/types';

const AccountsList: FC<TAccountsListProps> = ({
  title,
  items,
  setSelectedAccount,
}) => {
  const setAccount = useCallback(
    (account: TAccount) => () => {
      setSelectedAccount && setSelectedAccount(account);
    },
    [setSelectedAccount],
  );
  return (
    <View style={styles.wrapper}>
      {(items || []).length > 0 ? (
        <Text style={styles.title}>{title}</Text>
      ) : null}
      {(items || []).map((item, idx) => (
        <AccountItem
          name={item.accountName}
          key={item.accountName}
          isFirst={!idx}
          onPress={setAccount(item as TAccount)}
        />
      ))}
    </View>
  );
};

export default AccountsList;
