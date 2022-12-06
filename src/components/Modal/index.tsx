import React, {FC, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import RNModal from 'react-native-modal';
import CircleXSvg from '../../assets/images/circle-x.svg';
import {TModalProps} from './types';
import {styles} from './styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const Modal: FC<TModalProps> = ({
  close,
  children,
  leftHeaderItem,
  title,
  onPressLeftItem,
  logo,
  contentStyle,
  ...restProps
}) => {
  useEffect(() => {
    if (restProps?.isVisible) {
      ReactNativeHapticFeedback.trigger('impactMedium', {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: false,
      });
    }
  }, [restProps?.isVisible]);
  return (
    <RNModal
      {...restProps}
      style={styles.modal}
      propagateSwipe={true}
      onBackdropPress={close}
      onBackButtonPress={close}
      backdropTransitionOutTiming={0}
      useNativeDriverForBackdrop={true}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      backdropColor="#000000"
      backdropOpacity={0.7}>
      <View style={styles.wrapper}>
        {title ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
            style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressLeftItem}
              style={styles.leftItemWrapper}>
              {leftHeaderItem}
            </TouchableOpacity>
            {logo && <View style={styles.logoWrapper}>{logo}</View>}
            <Text style={[styles.title, logo && styles.titleWithLogo]}>
              {title}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={close}
              style={styles.closeBtnWrapper}>
              <CircleXSvg />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          style={[styles.contentWrapper, contentStyle]}>
          {children}
        </ScrollView>
      </View>
    </RNModal>
  );
};

export default Modal;
