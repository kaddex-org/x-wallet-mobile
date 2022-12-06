import React, {FC, useEffect, useState} from 'react';
import {TextInput, View, Text, TouchableOpacity, Alert} from 'react-native';
import {TMainnet} from '../../../../constants/tokensTypes';
import BasicSearchSvg from '../../../../assets/images/basic-search.svg';

import Modal from '../../../../components/Modal';
import {TWallet} from '../../../../store/userWallet/types';
import {getAssetImageView} from '../../../../utils/getAssetImageView';
import {tokens} from '../../../../constants/tokens.json';
import {styles} from './styles';
import {TSelectTokenModal} from './types';

const SelectTokenModal: FC<TSelectTokenModal> = React.memo(
  ({
    close,
    isVisible,
    walletList,
    setSelectedToken,
    selectedToken,
    anotherToken,
    title,
  }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredWallets, setFilteredWallets] = useState<TWallet[]>([]);

    useEffect(() => {
      setFilteredWallets(
        walletList.filter(item =>
          item.tokenName.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }, [searchText, walletList]);

    const handleTokenPress = (token: TWallet) => () => {
      if (token.tokenAddress !== 'coin' && anotherToken.address !== 'coin') {
        return createConfirmModal(token);
      }
      setSelectedToken(prev => ({
        ...prev,
        balance: token.totalAmount,
        coin: token.tokenName,
        address: token.tokenAddress,
        precision:
          tokens.mainnet[token.tokenName as keyof TMainnet]?.precision || 12,
      }));
      close();
    };

    const createConfirmModal = (token: TWallet) =>
      Alert.alert(
        'Warning',
        `Pool ${
          title === 'RECEIVE'
            ? anotherToken.coin + ' / ' + token.tokenName
            : token.tokenName + ' / ' + anotherToken.coin
        } does not exist`,
        [{text: 'OK'}],
      );

    return (
      <Modal isVisible={isVisible} close={close} title="Select Token">
        <View style={styles.modalContainer}>
          <View style={styles.searchSection}>
            <BasicSearchSvg />
            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              placeholder="Search token"
              value={searchText}
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus={false}
              onChangeText={setSearchText}
            />
          </View>
          <Text style={styles.title}>Tokens</Text>
          {filteredWallets.length ? (
            filteredWallets.map((walletItem: TWallet, listIndex: number) => (
              <TouchableOpacity
                disabled={
                  selectedToken.coin === walletItem.tokenName ||
                  anotherToken.coin === walletItem.tokenName
                }
                key={listIndex}
                onPress={handleTokenPress(walletItem)}
                style={[
                  styles.token,
                  {
                    opacity:
                      selectedToken.coin === walletItem.tokenName ||
                      anotherToken.coin === walletItem.tokenName
                        ? 0.5
                        : 1,
                  },
                ]}>
                {getAssetImageView(walletItem.tokenAddress)}
                <Text style={styles.tokenName}>{walletItem.tokenName}</Text>
                {selectedToken.coin === walletItem.tokenName && (
                  <Text style={styles.selected}>{' (Selected)'}</Text>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>Token not found</Text>
          )}
        </View>
      </Modal>
    );
  },
);

export default SelectTokenModal;
