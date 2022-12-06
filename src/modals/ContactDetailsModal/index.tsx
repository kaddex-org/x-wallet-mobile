import React, {FC, useCallback} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';

import PencilEditSvg from '../../assets/images/pencil-edit.svg';
import TrashEmptySvg from '../../assets/images/trash-empty.svg';
import BasicCopySvg from '../../assets/images/basic-copy.svg';
import Modal from '../../components/Modal';
import ListItem from '../../components/ListItem';
import {TContactDetailsModalProps} from './types';
import {styles} from './styles';
import {ERootStackRoutes} from '../../routes/types';
import {makeSelectSelectedContact} from '../../store/contacts/selectors';
import {deleteSelectedContact} from '../../store/contacts';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useShallowEqualSelector} from '../../store/utils';

const ContactDetailsModal: FC<TContactDetailsModalProps> = React.memo(
  ({toggle, isVisible}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    const contact = useShallowEqualSelector(makeSelectSelectedContact);

    const handlePressRemove = useCallback(() => {
      dispatch(deleteSelectedContact());
      toggle();
    }, [toggle]);

    const handlePressEdit = useCallback(() => {
      toggle();
      navigation.navigate(ERootStackRoutes.AddEditContact);
    }, [toggle, navigation]);

    const copyToClipboard = useCallback(() => {
      ReactNativeHapticFeedback.trigger('impactMedium', {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: false,
      });
      Clipboard.setString(contact?.accountName || '');
      Snackbar.show({
        text: 'Copied to clipboard!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, [contact]);

    return (
      <Modal
        isVisible={isVisible}
        close={toggle}
        title={contact?.contactName}
        logo={
          <Image
            style={styles.image}
            source={require('../../assets/images/walletProfile.png')}
          />
        }>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.accountNameSection}>
              <View style={styles.accountNameSectionHeader}>
                <Text style={styles.title}>account name</Text>
                <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.8}>
                  <BasicCopySvg />
                </TouchableOpacity>
              </View>
              <Text
                onPress={copyToClipboard}
                style={[styles.text, styles.accountName]}>
                {contact?.accountName}
              </Text>
            </View>
            <View style={styles.chainIdSection}>
              <Text style={styles.title}>Chain ID</Text>
              <Text style={[styles.text, styles.chainIdText]}>
                {contact?.chainId}
              </Text>
            </View>
          </View>
          <View style={styles.modalFooter}>
            <ListItem
              text="Edit Contact"
              icon={<PencilEditSvg />}
              style={styles.itemStyle}
              onPress={handlePressEdit}
            />
            <ListItem
              text="Delete"
              icon={<TrashEmptySvg />}
              onPress={handlePressRemove}
            />
          </View>
        </View>
      </Modal>
    );
  },
);

export default ContactDetailsModal;
