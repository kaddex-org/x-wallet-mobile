import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import BasicSettingsSvg from '../../../../assets/images/basic-settins.svg';
import {TouchableOpacity} from 'react-native';
import Modal from '../../../../components/Modal';
import RadioTab from '../../../../components/RadioTab';
import {transactionSpeedOptions} from './consts';
import Input from '../../../../components/Input';
import FooterButton from '../../../../components/FooterButton';
import {styles} from './styles';
import {estimatedGasFeeSchema} from '../../../../validation/estimatedGasFeeSchema';
import {makeSelectEstimatedGasFee} from '../../../../store/transfer/selectors';
import {setEstimatedGasFee} from '../../../../store/transfer';
import {EGAsSpeed} from '../../../../store/transfer/types';
import {
  FAST_GAS_PRICE,
  GAS_PRICE,
  ECONOMY_GAS_PRICE,
} from '../../../../constants';
import {useShallowEqualSelector} from '../../../../store/utils';

const Settings = React.memo(() => {
  const dispatch = useDispatch();

  const [isVisible, setVisible] = useState(false);
  const estimatedGasFee = useShallowEqualSelector(makeSelectEstimatedGasFee);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: estimatedGasFeeSchema,
    defaultValues: {
      speed: estimatedGasFee.speed,
      gasLimit: estimatedGasFee.gasLimit.toString(),
      gasPrice: estimatedGasFee.gasPrice.toString(),
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (isVisible) {
      setValue('speed', estimatedGasFee.speed);
      setValue('gasLimit', estimatedGasFee.gasLimit.toString());
      setValue('gasPrice', estimatedGasFee.gasPrice.toString());
    }
  }, [setValue, estimatedGasFee, isVisible]);

  const toggleModal = useCallback(() => {
    setVisible(!isVisible);
  }, [isVisible]);

  const handlePressSave = useCallback(
    (data: FieldValues) => {
      dispatch(setEstimatedGasFee(data));
      toggleModal();
    },
    [toggleModal],
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.iconWrapper}
        onPress={toggleModal}>
        <BasicSettingsSvg />
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        close={toggleModal}
        title="Transaction Parameters">
        <View style={styles.contentWrapper}>
          <Controller
            control={control}
            name="speed"
            render={({field: {onChange, value}}) => (
              <RadioTab
                label="Transaction speed"
                options={transactionSpeedOptions}
                value={value}
                onChange={v => {
                  onChange(v);
                  if (v === EGAsSpeed.FAST) {
                    setValue('gasPrice', `${FAST_GAS_PRICE}`);
                  } else if (v === EGAsSpeed.ECONOMY) {
                    setValue('gasPrice', `${ECONOMY_GAS_PRICE}`);
                  } else {
                    setValue('gasPrice', `${GAS_PRICE}`);
                  }
                }}
                labelStyle={styles.radioLabel}
                buttonStyle={styles.radioButton}
                buttonsWrapperStyle={styles.radioButtonWrapper}
              />
            )}
          />
          <View style={styles.inputsWrapper}>
            <Controller
              control={control}
              name="gasLimit"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Gas limit"
                  keyboardType="decimal-pad"
                  placeholder="Type Gas Limit"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.gasLimit?.message as string}
                />
              )}
            />
            <Controller
              control={control}
              name="gasPrice"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Gas Price"
                  keyboardType="decimal-pad"
                  wrapperStyle={styles.priceWrapper}
                  placeholder="Type Gas Price"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.gasPrice?.message as string}
                />
              )}
            />
          </View>
        </View>
        <FooterButton title="Save" onPress={handleSubmit(handlePressSave)} />
      </Modal>
    </>
  );
});

export default Settings;
