import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Text,
  TextInput,
} from 'react-native';

import TopHeader from '../../components/TopHeader';
import Header from './components/Header';
import DestinationAccount from './components/DestinationAccount';
import AccountsList from './components/AccountsList';
import FooterButton from '../../components/FooterButton';
import ChainId from '../../components/ChainId';
import {chainIds, predicates} from './consts';
import {
  ERootStackRoutes,
  TNavigationProp,
  TNavigationRouteProp,
} from '../../routes/types';

import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {
  setEstimatedGasFee,
  setGatheredTransferInfo,
} from '../../store/transfer';
import {TAccount} from '../../store/userWallet/types';
import {makeSelectContactsList} from '../../store/contacts/selectors';
import {makeSelectRecentReceivers} from '../../store/history/selectors';
import {GAS_LIMIT, GAS_PRICE} from '../../constants';
import Content from './components/Content';
import {useShallowEqualSelector} from '../../store/utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {makeSelectSelectedToken} from '../../store/userWallet/selectors';

const Send = () => {
  const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Send>>();
  const route = useRoute<TNavigationRouteProp<ERootStackRoutes.Send>>();

  const dispatch = useDispatch();

  const [sourceChainId, setSourceChainId] = useState<string | null>(
    route?.params?.sourceChainId || '0',
  );
  const [targetChainId, setTargetChainId] = useState<string | null>(null);
  const [predicate, setPredicate] = useState<string | null>(null);
  const [accountPublicKey, setAccountPublicKey] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');

  const handlePressContinue = useCallback(() => {
    dispatch(
      setGatheredTransferInfo({
        chainId: sourceChainId,
        destinationAccount: {
          accountName,
          chainId: targetChainId,
          publicKey: accountPublicKey,
        },
        predicate,
      }),
    );
    dispatch(
      setEstimatedGasFee({
        speed: 'normal',
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT,
      }),
    );
    setTimeout(
      () =>
        navigation.navigate({
          name: ERootStackRoutes.SendSummary,
          params: undefined,
        }),
      150,
    );
  }, [
    navigation,
    sourceChainId,
    accountName,
    targetChainId,
    accountPublicKey,
    predicate,
  ]);

  const setSelectedAccountFunc = useCallback((account: TAccount) => {
    setAccountName(account?.accountName || '');
    setTargetChainId(account?.chainId || '');
    setAccountPublicKey(account?.publicKey || '');
  }, []);

  const recentAccounts = useShallowEqualSelector(makeSelectRecentReceivers);
  const contacts = useShallowEqualSelector(makeSelectContactsList);
  const selectedToken = useShallowEqualSelector(makeSelectSelectedToken);

  useEffect(() => {
    if (accountName?.startsWith('k:') && !predicate) {
      setPredicate(predicates[0].value);
    }
  }, [accountName, predicate]);

  const balance = useMemo(() => {
    if (selectedToken?.chainBalance && sourceChainId) {
      return selectedToken?.chainBalance[sourceChainId];
    }
    return 0;
  }, [selectedToken, sourceChainId]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={styles.container}>
      <Header />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.contentWrapper}>
        <TopHeader>
          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
            style={styles.topHeaderContent}>
            <ChainId
              label="Source Chain ID"
              value={sourceChainId}
              setValue={setSourceChainId}
              items={chainIds}
              wrapperStyle={styles.chainWrapper}
            />
            {sourceChainId ? (
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>{'Chain balance'}</Text>
                <TextInput
                  editable={false}
                  focusable={false}
                  autoCorrect={false}
                  autoFocus={false}
                  autoComplete={'off'}
                  autoCapitalize={'none'}
                  value={`${(Number(balance) || 0).toFixed(3)} ${
                    selectedToken?.tokenName || ''
                  }`}
                  style={styles.balanceText}
                />
              </View>
            ) : null}
            <View style={styles.margin} />
            <DestinationAccount
              selectedAccount={accountName}
              setSelectedAccount={setAccountName}
            />
            <ChainId
              label="Target Chain ID"
              value={targetChainId}
              setValue={setTargetChainId}
              items={chainIds}
              wrapperStyle={styles.chainSecondWrapper}
            />
          </TouchableOpacity>
        </TopHeader>
        <Content
          predicate={predicate}
          setPredicate={setPredicate}
          receiverPublicKey={accountPublicKey}
          setReceiverPublicKey={setAccountPublicKey}
        />
        <AccountsList
          title="Recent"
          items={recentAccounts}
          setSelectedAccount={setSelectedAccountFunc}
        />
        <AccountsList
          title="Contacts"
          items={contacts}
          setSelectedAccount={setSelectedAccountFunc}
        />
      </ScrollView>
      <View style={styles.footer}>
        <FooterButton
          disabled={!sourceChainId || !targetChainId || !accountName}
          title="Continue"
          onPress={handlePressContinue}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Send;
