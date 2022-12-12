import React, {FC, useCallback, useMemo} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {TListItemProps} from './types';

import ArrowBottomRightSvg from '../../../../assets/images/arrow-bottom-right.svg';
import ArrowTopBottomRightSvg from '../../../../assets/images/arrow-top-right.svg';

import {styles} from './styles';
import {cutStr, numberWithCommas} from '../../../../utils/stringHelpers';
import {useDispatch, useSelector} from 'react-redux';
import {makeSelectSelectedAccount} from '../../../../store/userWallet/selectors';
import {finishTransfer} from '../../../../store/transfer/actions';
import {makeSelectActiveNetworkDetails} from '../../../../store/networks/selectors';
import {
  setGatheredTransferInfo,
  setTransferResult,
} from '../../../../store/transfer';
import {useNavigation} from '@react-navigation/native';
import {ERootStackRoutes, TNavigationProp} from '../../../../routes/types';
import {useShallowEqualSelector} from '../../../../store/utils';
import Toast from 'react-native-toast-message';
import {statusBarHeight} from '../../../../utils/deviceHelpers';
import {makeSelectIsTransferring} from '../../../../store/transfer/selectors';

const ListItem: FC<TListItemProps> = React.memo(
  ({item: activityItem, onPress}) => {
    const {
      title,
      continuation,
      amount,
      amountFrom,
      amountTo,
      coinFrom,
      coinTo,
      sender,
      receiver,
      coinShortName,
      time,
      status,
      type,
    } = activityItem;

    const navigation = useNavigation<TNavigationProp<ERootStackRoutes.Home>>();

    const dispatch = useDispatch();

    const isCurrentlyTransferring = useSelector(makeSelectIsTransferring);
    const selectedAccount = useShallowEqualSelector(makeSelectSelectedAccount);
    const networkDetails = useShallowEqualSelector(
      makeSelectActiveNetworkDetails,
    );

    const isPending = useMemo(
      () =>
        status === 'pending' ||
        (continuation?.step || 0) < (continuation?.stepCount || 0) - 1,
      [status, continuation],
    );
    const isFailed = useMemo(() => status === 'failure', [status]);

    const onFinishTransfer = useCallback(() => {
      if (networkDetails) {
        if (isCurrentlyTransferring) {
          Toast.show({
            type: 'info',
            position: 'top',
            visibilityTime: 4000,
            autoHide: true,
            text1: 'Transfer is pending!',
            text2: 'Please try again once transfer is finished',
            topOffset: statusBarHeight + 16,
          });
        } else {
          dispatch(setTransferResult({}));
          dispatch(
            setGatheredTransferInfo({
              amount: Number(amount),
            }),
          );
          dispatch(
            finishTransfer({
              networkDetail: networkDetails,
              activity: activityItem,
            }),
          );
          setTimeout(
            () =>
              navigation.navigate({
                name: ERootStackRoutes.SendProgress,
                params: undefined,
              }),
            150,
          );
        }
      }
    }, [isCurrentlyTransferring, networkDetails, activityItem, navigation]);

    const amountText = useMemo(
      () =>
        `${
          selectedAccount?.accountName === sender
            ? '- '
            : selectedAccount?.accountName === receiver
            ? '+ '
            : ''
        }${
          amountFrom
            ? amountTo
              ? `${numberWithCommas(amountTo.toFixed(4) || '')} ${
                  coinTo || ''
                } (${numberWithCommas(amountFrom.toFixed(2) || '')} ${
                  coinFrom || ''
                })`
              : `${numberWithCommas(amountFrom.toFixed(2) || '')} ${
                  coinFrom || ''
                }`
            : `${numberWithCommas(amount || '')} ${coinShortName || ''}`
        }`,
      [
        amountTo,
        amountFrom,
        amount,
        coinTo,
        coinFrom,
        coinShortName,
        sender,
        receiver,
        selectedAccount?.accountName,
      ],
    );

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.container}
          onPress={onPress}>
          <View style={styles.rightSide}>
            {selectedAccount?.accountName === sender ? (
              <View style={styles.iconWrapper}>
                <ArrowTopBottomRightSvg
                  fill={isPending ? 'black' : isFailed ? '#FF6058' : '#27CA40'}
                />
              </View>
            ) : selectedAccount?.accountName === receiver ? (
              <View style={styles.iconWrapper}>
                <ArrowBottomRightSvg
                  fill={isPending ? 'black' : isFailed ? '#FF6058' : '#27CA40'}
                />
              </View>
            ) : !type ? (
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../../../assets/images/walletConnect.png')}
                  style={styles.walletConnectIcon}
                  resizeMode="contain"
                />
              </View>
            ) : null}
            <View style={styles.center}>
              <Text style={styles.title}>{cutStr(title)}</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
          </View>
          <Text
            style={[
              styles.amount,
              isFailed && styles.outgoingAmount,
              isPending && styles.ongoingAmount,
            ]}>
            {amountText}
          </Text>
        </TouchableOpacity>
        {!type &&
        (continuation?.step || 0) < (continuation?.stepCount || 0) - 1 ? (
          <TouchableOpacity
            disabled={!networkDetails}
            activeOpacity={0.8}
            onPress={onFinishTransfer}
            style={styles.finishButton}>
            <Text style={styles.finishButtonText}>
              Finish Cross Chain Transfer
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);

export default ListItem;
