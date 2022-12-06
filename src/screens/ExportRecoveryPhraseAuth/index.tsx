import React, {useCallback, useRef} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Platform} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import Header from './components/Header';
import SecurityUnlockSvg from '../../assets/images/security-unlock.svg';
import PasswordInput from '../../components/PasswordInput';
import {exportRecoveryPhraseSchema} from '../../validation/exportRecoveryPhraseSchema';
import {styles} from './styles';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {useScrollBottomOnKeyboard} from '../../utils/keyboardHelpers';
import {bottomSpace} from '../../utils/deviceHelpers';
import {useNavigation} from '@react-navigation/native';

const ExportRecoveryPhraseAuth = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.ExportRecoveryPhraseAuth>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: exportRecoveryPhraseSchema,
  });

  const handlePressContinue = useCallback(() => {
    navigation.replace(ERootStackRoutes.ExportRecoveryPhrase, {} as any);
  }, [navigation]);

  const scrollRef = useRef<ScrollView | null>(null);
  useScrollBottomOnKeyboard(scrollRef);

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
        contentContainerStyle={styles.content}>
        <SecurityUnlockSvg fill="#787B8E" />
        <Text style={styles.text}>Enter your password to continue</Text>
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <PasswordInput
              wrapperStyle={styles.passwordWrapper}
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              blurOnSubmit={true}
              errorMessage={errors.password?.message as string}
              autoFocus={true}
              onSubmitEditing={handleSubmit(handlePressContinue)}
            />
          )}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleSubmit(handlePressContinue)}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-bottomSpace} />}
      </ScrollView>
    </View>
  );
};

export default ExportRecoveryPhraseAuth;
