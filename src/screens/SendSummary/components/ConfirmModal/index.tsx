import React, {FC} from 'react';
import {Text, View} from 'react-native';

import Modal from '../../../../components/Modal';
import {styles} from './styles';
import {TConfirmModal} from './types';
import Button from '../../../Wallet/components/WalletBalance/components/Button';
import AccountFromTo from '../../../../components/AccountFromTo';
import {useShallowEqualSelector} from '../../../../store/utils';
import {
  makeSelectSelectedAccount,
  makeSelectSelectedToken,
} from '../../../../store/userWallet/selectors';
import {
  makeSelectEstimatedGasFee,
  makeSelectGatheredInfo,
  makeSelectIsCrossChainTransfer,
} from '../../../../store/transfer/selectors';
import Warning from '../../../../components/Warning';
import {useSelector} from 'react-redux';

const ConfirmModal: FC<TConfirmModal> = ({isVisible, close, onConfirm}) => {
  const sourceAccount = useShallowEqualSelector(makeSelectSelectedAccount);
  const selectedToken = useShallowEqualSelector(makeSelectSelectedToken);
  const gatheredInfo = useShallowEqualSelector(makeSelectGatheredInfo);
  const estimatedGas = useShallowEqualSelector(makeSelectEstimatedGasFee);
  const isCrossChainTransfer = useSelector(makeSelectIsCrossChainTransfer);
  const {gasLimit, gasPrice, speed} = estimatedGas;

  return (
    <Modal
      isVisible={isVisible}
      close={close}
      title="Confirm Send Transaction"
      contentStyle={styles.content}>
      <View style={styles.container}>
        <AccountFromTo
          fromAccount={sourceAccount?.accountName!}
          toAccount={gatheredInfo?.destinationAccount?.accountName!}
          fromChainId={gatheredInfo?.chainId}
          toChainId={gatheredInfo?.destinationAccount?.chainId!}
        />
        <View style={styles.detailContainer}>
          <View style={styles.item}>
            <Text style={styles.title}>{'Amount:'}</Text>
            <Text style={styles.text}>{`${gatheredInfo?.amount || 0} ${
              selectedToken?.tokenName || ''
            }`}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{'Gas Limit:'}</Text>
            <Text style={styles.text}>{gasLimit}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{'Gas Price:'}</Text>
            <Text style={styles.text}>{gasPrice}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{'Speed:'}</Text>
            <Text style={styles.text}>{`${speed.toUpperCase()}`}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          {isCrossChainTransfer ? (
            <Warning
              title="You are about to do a cross chain transfer"
              text="This operation usually takes more time"
            />
          ) : null}
          <Button style={styles.button} onPress={onConfirm} title="CONFIRM" />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
