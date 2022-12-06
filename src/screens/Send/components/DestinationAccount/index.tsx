import React, {FC, useCallback, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {TDestinationAccountProps} from './types';
import WalletItem from '../../../../components/WalletItem';
import CircleXSvg from '../../../../assets/images/circle-x.svg';
import QRSvg from '../../../../assets/images/qr.svg';
import {MAIN_COLOR} from '../../../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {ERootStackRoutes, TNavigationProp} from '../../../../routes/types';

const DestinationAccount: FC<TDestinationAccountProps> = React.memo(
  ({selectedAccount, setSelectedAccount}) => {
    const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Home>>();

    const [name, setName] = useState<string>('');

    const handlePressReturn = useCallback(() => {
      if (name) {
        setSelectedAccount && setSelectedAccount(name);
        setName('');
      }
    }, [name, setSelectedAccount]);

    const handlePressErase = useCallback(() => {
      setSelectedAccount && setSelectedAccount('');
    }, [setSelectedAccount]);

    const onScan = useCallback(() => {
      navigation.navigate({
        name: ERootStackRoutes.ReceiverScan,
        params: {
          onScan: (v: string) => {
            setSelectedAccount && setSelectedAccount(v);
            setName('');
          },
        },
      });
    }, [navigation, setSelectedAccount]);

    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>Destination Account</Text>
        {selectedAccount ? (
          <View style={styles.selectedAccountWrapper}>
            <WalletItem
              name={selectedAccount}
              textStyle={styles.selectedAccountText}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={handlePressErase}>
              <CircleXSvg />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter destination account"
              autoCapitalize="none"
              autoFocus={true}
              onEndEditing={handlePressReturn}
              onBlur={handlePressReturn}
              onSubmitEditing={handlePressReturn}
              onChangeText={setName}
              value={name}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onScan}
              hitSlop={{bottom: 16, top: 16, left: 16, right: 16}}
              style={styles.scan}>
              <QRSvg fill={MAIN_COLOR} width={24} height={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  },
);

export default DestinationAccount;
