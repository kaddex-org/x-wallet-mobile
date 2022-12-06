import React, {useCallback} from 'react';
import {Keyboard, ScrollView, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import TopHeader from '../../components/TopHeader';
import Header from './components/Header';
import FooterButton from '../../components/FooterButton';
import AccountFromTo from '../../components/AccountFromTo';
import WalletInfo from './components/WalletInfo';
import Content from './components/Content';
import Warning from '../../components/Warning';
import {styles} from './styles';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import {
  makeSelectEstimatedGasFee,
  makeSelectGatheredInfo,
  makeSelectIsCrossChainTransfer,
} from '../../store/transfer/selectors';
import {makeTransfer} from '../../store/transfer/actions';
import {makeSelectActiveNetworkDetails} from '../../store/networks/selectors';
import {
  makeSelectSelectedAccount,
  makeSelectSelectedToken,
} from '../../store/userWallet/selectors';
import {setTransferResult} from '../../store/transfer';
import {useShallowEqualSelector} from '../../store/utils';
import {useNavigation} from '@react-navigation/native';

const SendSummary = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.SendSummary>>();

  const dispatch = useDispatch();

  const isCrossChainTransfer = useSelector(makeSelectIsCrossChainTransfer);
  const networkDetail = useShallowEqualSelector(makeSelectActiveNetworkDetails);
  const gatheredInfo = useShallowEqualSelector(makeSelectGatheredInfo);
  const estimatedGasFee = useShallowEqualSelector(makeSelectEstimatedGasFee);
  const sourceAccount = useShallowEqualSelector(makeSelectSelectedAccount);
  const sourceToken = useShallowEqualSelector(makeSelectSelectedToken);

  const handlePressSend = useCallback(() => {
    if (networkDetail && sourceAccount) {
      dispatch(
        makeTransfer({
          networkDetail,
          gatheredInfo,
          sourceAccount,
          sourceToken,
          estimatedGasFee,
        }),
      );
      dispatch(setTransferResult({}));
      setTimeout(
        () =>
          navigation.navigate({
            name: ERootStackRoutes.SendProgress,
            params: undefined,
          }),
        150,
      );
    }
  }, [
    networkDetail,
    gatheredInfo,
    sourceAccount,
    sourceToken,
    estimatedGasFee,
    navigation,
  ]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        keyboardDismissMode="on-drag"
        stickyHeaderIndices={[0]}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <TopHeader>
          <AccountFromTo
            fromAccount={sourceAccount?.accountName!}
            toAccount={gatheredInfo?.destinationAccount?.accountName!}
            fromChainId={gatheredInfo?.chainId}
            toChainId={gatheredInfo?.destinationAccount?.chainId!}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
            style={styles.topHeaderContent}>
            <WalletInfo />
            {isCrossChainTransfer ? (
              <Warning
                title="You are about to do a cross chain transfer"
                text="This operation usually takes more time"
              />
            ) : null}
          </TouchableOpacity>
        </TopHeader>
        <Content />
      </ScrollView>
      <View style={styles.footer}>
        <FooterButton
          title="Send"
          onPress={handlePressSend}
          disabled={!gatheredInfo?.amount}
        />
      </View>
    </View>
  );
};

export default SendSummary;
