import {useNavigation} from '@react-navigation/native';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import {styles} from './styles';
import Input from '../../components/Input';
import {logout} from '../../store/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {verify2FA} from '../../api/2fa';
import {makeSelectSelectedAccountPublicKey} from '../../store/userWallet/selectors';

export type TConfirmModalProps = {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const Confirm2FaModal: FC<TConfirmModalProps> = ({isVisible, setVisible}) => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.RecoveryFromSeeds>>();

  const dispatch = useDispatch();

  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');

  const selectedAccountPublicKey = useSelector(
    makeSelectSelectedAccountPublicKey,
  );

  const verifyCode = useCallback(async () => {
    setVerifying(true);
    try {
      if (selectedAccountPublicKey) {
        const status = await verify2FA(selectedAccountPublicKey, code);
        setVerifying(false);
        switch (status) {
          case 'success':
            setVisible(false);
            return;
          case 'code is incorrect':
            Alert.alert('Authentication Failed', 'Incorrect code');
            return;
        }
      } else {
        setVerifying(false);
      }
    } catch (e) {
      setVerifying(false);
    }
  }, [selectedAccountPublicKey, navigation, code]);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      dispatch(logout());
    }, 600);
  }, []);

  return (
    <Modal
      avoidKeyboard={true}
      backdropOpacity={0.7}
      style={styles.modal}
      isVisible={isVisible}>
      <View style={styles.modalBlock}>
        <Text style={styles.title}>Confirm Authentication</Text>
        <View style={styles.content}>
          <Text style={styles.info}>
            2-factor authenticator is enabled. Please confirm this
            authentication session with Google Authentication
          </Text>
          <Input
            label="Verification Code"
            autoCapitalize="none"
            placeholder="Enter Code"
            wrapperStyle={styles.inputWrapper}
            onChangeText={setCode}
            value={code}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={close}
            disabled={verifying}
            style={[styles.cancelBtn, verifying && styles.disableBtn]}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={verifying}
            onPress={verifyCode}
            style={[styles.submitBtn, verifying && styles.disableBtn]}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Confirm2FaModal;
