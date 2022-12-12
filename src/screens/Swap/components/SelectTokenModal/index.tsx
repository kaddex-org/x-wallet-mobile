import React, {FC, useCallback, useEffect, useState} from 'react';
import {TextInput, View, Text, TouchableOpacity, Alert} from 'react-native';
import {TMainnet} from '../../../../constants/tokensTypes';
import BasicSearchSvg from '../../../../assets/images/basic-search.svg';

import Modal from '../../../../components/Modal';
import {TWallet} from '../../../../store/userWallet/types';
import {getAssetImageView} from '../../../../utils/getAssetImageView';
import {setSelectedToken as setSelectedTokenAction} from '../../../../store/userWallet';
import {tokens} from '../../../../constants/tokens.json';
import {styles} from './styles';
import {TSelectTokenModal} from './types';
import {swapTokens} from '../../contants';
import {defaultBalances} from '../../../../store/userWallet/const';
import {ERootStackRoutes} from '../../../../routes/types';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

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
    const navigation = useNavigation<any>();

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [filteredWallets, setFilteredWallets] = useState<any[]>([]);

    useEffect(() => {
      setSearchText('');
    }, [isVisible]);

    useEffect(() => {
      const walletTokens: (TWallet & {notInWallet?: boolean})[] =
        walletList.filter(walletItem =>
          swapTokens.some(
            swapToken => swapToken?.tokenAddress === walletItem?.tokenAddress,
          ),
        );
      swapTokens.forEach(swapToken => {
        if (
          !walletTokens?.some(
            item => item?.tokenAddress === swapToken?.tokenAddress,
          )
        ) {
          walletTokens.push({
            ...swapToken,
            chainBalance: defaultBalances,
            totalAmount: 0,
            notInWallet: true,
          });
        }
      });
      setFilteredWallets(
        walletTokens.filter(item =>
          item.tokenName.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }, [searchText, walletList]);

    const createConfirmModal = useCallback(
      (token: TWallet) =>
        Alert.alert(
          'Warning',
          `Pool ${
            title === 'RECEIVE'
              ? anotherToken.coin + ' / ' + token.tokenName
              : token.tokenName + ' / ' + anotherToken.coin
          } does not exist`,
          [{text: 'OK'}],
        ),
      [title, anotherToken],
    );

    const handleTokenPress = useCallback(
      (token: TWallet & {notInWallet?: boolean}) => () => {
        if (token?.notInWallet) {
          Alert.alert(
            'Adding New Token',
            'This token does not exist in your wallet. Would you like to add?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Add',
                onPress: () => {
                  close();
                  setTimeout(() => {
                    dispatch(setSelectedTokenAction(null));
                    navigation.navigate(ERootStackRoutes.AddToken, {
                      tokenName: token.tokenAddress,
                      onTokenAdd: (tokenName: string, tokenAddress: string) => {
                        if (
                          token.tokenAddress !== 'coin' &&
                          anotherToken.address !== 'coin'
                        ) {
                          createConfirmModal(token);
                        } else {
                          setSelectedToken(prev => ({
                            ...prev,
                            balance: 0,
                            coin: tokenName,
                            address: tokenAddress,
                            precision:
                              tokens.mainnet[tokenName as keyof TMainnet]
                                ?.precision || 12,
                          }));
                        }
                      },
                    } as any);
                  }, 300);
                },
              },
            ],
          );
        } else {
          if (
            token.tokenAddress !== 'coin' &&
            anotherToken.address !== 'coin'
          ) {
            return createConfirmModal(token);
          }
          setSelectedToken(prev => ({
            ...prev,
            balance: token.totalAmount,
            coin: token.tokenName,
            address: token.tokenAddress,
            precision:
              tokens.mainnet[token.tokenName as keyof TMainnet]?.precision ||
              12,
          }));
          close();
        }
      },
      [createConfirmModal, tokens, setSelectedToken, close, anotherToken],
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
                  (selectedToken.coin === walletItem.tokenName ||
                    anotherToken.coin === walletItem.tokenName) &&
                    styles.tokenOpacityHalf,
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
