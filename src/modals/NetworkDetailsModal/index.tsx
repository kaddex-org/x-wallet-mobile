import React, {FC, useCallback} from 'react';
import {View, Text} from 'react-native';

import PencilEditSvg from '../../assets/images/pencil-edit.svg';
import TrashEmptySvg from '../../assets/images/trash-empty.svg';
import NetworksSvg from '../../assets/images/networks.svg';
import Modal from '../../components/Modal';
import ListItem from '../../components/ListItem';

import {TNetworkDetailsModalProps} from './types';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {makeSelectSelectedNetwork} from '../../store/networks/selectors';
import {deleteSelectedNetwork} from '../../store/networks';
import {useNavigation} from '@react-navigation/native';
import {ERootStackRoutes} from '../../routes/types';
import {useShallowEqualSelector} from '../../store/utils';
import {MAIN_COLOR} from '../../constants/styles';

const NetworkDetailsModal: FC<TNetworkDetailsModalProps> = React.memo(
  ({toggle, isVisible}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    const network = useShallowEqualSelector(makeSelectSelectedNetwork);

    const handlePressRemove = useCallback(() => {
      dispatch(deleteSelectedNetwork());
      toggle();
    }, [toggle]);

    const handlePressEdit = useCallback(() => {
      toggle();
      navigation.navigate(ERootStackRoutes.AddEditNetwork);
    }, [toggle, navigation]);

    return (
      <Modal
        isVisible={isVisible}
        close={toggle}
        title={network?.name}
        logo={<NetworksSvg fill={MAIN_COLOR} width={48} height={48} />}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentWrapper}>
            <View style={[styles.section, styles.borderBottom]}>
              <Text style={styles.title}>RPC URL</Text>
              <Text style={styles.text}>{network?.host}</Text>
            </View>
            <View style={[styles.section, styles.borderBottom]}>
              <Text style={styles.title}>Block Explorer URL</Text>
              <Text style={styles.text}>{network?.explorerUrl}</Text>
            </View>
          </View>
          {network?.isDefault || (
            <View style={styles.modalFooter}>
              <ListItem
                text="Edit Network"
                icon={<PencilEditSvg />}
                style={styles.itemStyle}
                onPress={handlePressEdit}
                disabled={network?.isDefault}
              />
              <ListItem
                text="Delete"
                icon={<TrashEmptySvg />}
                onPress={handlePressRemove}
                disabled={network?.isDefault}
              />
            </View>
          )}
        </View>
      </Modal>
    );
  },
);

export default NetworkDetailsModal;
