import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, View, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from './components/Header';
import Warning from '../../components/Warning';
import AccountFromTo from '../../components/AccountFromTo';
import SendProgressSvg from '../../assets/images/send-progress.svg';
import {styles} from './styles';
import {
  makeSelectGatheredInfo,
  makeSelectIsCrossChainTransfer,
  makeSelectTransferResult,
} from '../../store/transfer/selectors';
import {makeSelectSelectedToken} from '../../store/userWallet/selectors';
import Toast from 'react-native-toast-message';
import FooterButton from '../../components/FooterButton';
import {EHomeTabRoutes} from '../../routes/types';
import {setTransferBubble} from '../../store/transfer';
import {useShallowEqualSelector} from '../../store/utils';
import {statusBarHeight} from '../../utils/deviceHelpers';
import {useNavigation} from '@react-navigation/native';

const SendProgress = () => {
  const navigation = useNavigation<any>();

  const isCrossChainTransfer = useSelector(makeSelectIsCrossChainTransfer);
  const gatheredInfo = useShallowEqualSelector(makeSelectGatheredInfo);
  const transferResult = useShallowEqualSelector(makeSelectTransferResult);
  const selectedToken = useShallowEqualSelector(makeSelectSelectedToken);

  const [animation] = useState<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    if (transferResult?.status === 'pending') {
      Toast.show({
        type: 'info',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        text1: 'Transfer submitted!',
        text2: 'You can see the result in the activities tab',
        topOffset: statusBarHeight + 16,
      });
    }
  }, [transferResult?.status]);

  const onGoToActivities = useCallback(() => {
    navigation.navigate(EHomeTabRoutes.History);
  }, [navigation]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTransferBubble(false));
    return () => {
      dispatch(setTransferBubble(true));
    };
  }, []);

  const interpolated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.25],
  });

  return (
    <View style={styles.screen}>
      <Header />
      <Text style={styles.text}>
        {'Don’t close the application\nwhile it’s processing the operation.'}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          <Animated.View
            style={[
              styles.svgWrapper,
              {
                opacity: interpolated,
              },
            ]}>
            <SendProgressSvg />
          </Animated.View>
          <Text style={styles.title}>
            {`${gatheredInfo.amount} ${selectedToken?.tokenName || ''}`}
          </Text>
          {transferResult?.message ? (
            <>
              <Text style={styles.transferResult}>{'Result:'}</Text>
              <Text selectable={true} style={styles.transferResultValue}>
                {`${transferResult?.message || ''}`}
              </Text>
            </>
          ) : null}
          {transferResult?.text ? (
            <>
              <Text style={styles.transferText}>{'Message:'}</Text>
              <Text selectable={true} style={styles.transferTextValue}>
                {`${transferResult?.text || ''}`}
              </Text>
            </>
          ) : null}
          {transferResult?.requestKey ? (
            <>
              <Text style={styles.transferRequestKey}>{'Request Key:'}</Text>
              <Text selectable={true} style={styles.transferRequestKeyValue}>
                {`${transferResult?.requestKey || ''}`}
              </Text>
            </>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.accountView}>
        {isCrossChainTransfer && (
          <View style={styles.warning}>
            <Warning
              title="You are performing a cross chain transfer"
              text="This operation usually takes more time"
            />
          </View>
        )}
        <AccountFromTo
          fromAccount={transferResult.sender}
          fromChainId={transferResult.sourceChainId}
          toAccount={transferResult.receiver}
          toChainId={transferResult.targetChainId}
        />
        <View style={styles.buttonContainer}>
          <FooterButton
            title="Go To Activities"
            onPress={onGoToActivities}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

export default SendProgress;
