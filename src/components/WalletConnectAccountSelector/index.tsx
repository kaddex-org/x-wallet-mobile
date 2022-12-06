import React, {FC, useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import Checkbox from '../../components/Checkbox';
import {makeSelectAccounts} from '../../store/userWallet/selectors';
import {TWalletConnectAccountSelectorProps} from './types';
import {styles} from './styles';
import {TAccount} from '../../store/userWallet/types';
import {cutStr} from '../../utils/stringHelpers';
import {useShallowEqualSelector} from '../../store/utils';

const WalletConnectAccountSelectorModal: FC<TWalletConnectAccountSelectorProps> =
  React.memo(props => {
    const accounts = useShallowEqualSelector(makeSelectAccounts);
    const [selectedAccounts, setSelectedAccounts] = useState<TAccount[]>([]);

    const handlePressCheckBox = useCallback(
      (account: TAccount) => () => {
        if (
          selectedAccounts.some(
            item => item.accountName === account.accountName,
          )
        ) {
          const newAccounts = selectedAccounts.filter(
            item => item.accountName !== account.accountName,
          );
          setSelectedAccounts(newAccounts);
          props.onSelectAccounts(newAccounts);
        } else {
          const newAccounts = [...selectedAccounts, account];
          setSelectedAccounts(newAccounts);
          props.onSelectAccounts(newAccounts);
        }
      },
      [selectedAccounts],
    );

    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          {(accounts || []).map((account: TAccount) => (
            <Checkbox
              key={account.accountName}
              disableBuiltInState
              onPress={handlePressCheckBox(account)}
              isChecked={selectedAccounts.some(
                item => item.accountName === account.accountName,
              )}
              style={styles.checkBoxWrapper}
              textStyle={styles.checkBoxText}
              text={
                (
                  <>
                    {`${cutStr(account.publicKey || '')}\n`}
                    <Text style={styles.accountText}>{`account: ${cutStr(
                      account.accountName,
                    )}`}</Text>
                  </>
                ) as any
              }
            />
          ))}
        </View>
      </View>
    );
  });

export default WalletConnectAccountSelectorModal;
