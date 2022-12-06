import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import BasicSettingsSvg from '../../assets/images/basic-settins.svg';
import Modal from '../../components/Modal';
import Checkbox from '../../components/Checkbox';
import ListItem from '../../components/ListItem';
import {ERootStackRoutes} from '../../routes/types';
import {TNetworkSelectorModalProps} from './types';
import {styles} from './styles';
import {
  makeSelectActiveNetwork,
  makeSelectNetworksList,
} from '../../store/networks/selectors';
import {TNetwork} from '../../screens/Networks/components/Item/types';
import {setActiveNetwork} from '../../store/networks';
import {getNetworkDetails} from '../../store/networks/actions';
import {useShallowEqualSelector} from '../../store/utils';

const NetworkSelectorModal: FC<TNetworkSelectorModalProps> = React.memo(
  ({toggle, isVisible}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    const networks = useShallowEqualSelector(makeSelectNetworksList);
    const activeNetwork = useShallowEqualSelector(makeSelectActiveNetwork);

    const handlePressManageNetworks = useCallback(() => {
      toggle();
      navigation.navigate(ERootStackRoutes.Networks);
    }, [toggle, navigation]);

    const handlePressCheckBox = useCallback(
      (network: TNetwork) => async () => {
        dispatch(setActiveNetwork(network));
        dispatch(getNetworkDetails(network));
      },
      [],
    );

    return (
      <Modal isVisible={isVisible} close={toggle} title="Select Network">
        <View style={styles.modalContainer}>
          <View style={styles.modalContentWrapper}>
            {networks.map((network: TNetwork) => (
              <Checkbox
                isChecked={network.name === activeNetwork?.name}
                key={network.id}
                text={network.name}
                textStyle={styles.checkBoxText}
                style={styles.checkBoxWrapper}
                onPress={handlePressCheckBox(network)}
                disableBuiltInState
              />
            ))}
          </View>
          <View style={styles.modalFooter}>
            <ListItem
              text="Manage networks"
              icon={<BasicSettingsSvg />}
              onPress={handlePressManageNetworks}
            />
          </View>
        </View>
      </Modal>
    );
  },
);

export default NetworkSelectorModal;
