import React, {MutableRefObject, useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {CommonActions, useNavigation} from '@react-navigation/native';

import Logo from '../../assets/images/logo.svg';
import ArrowLeftSvg from '../../assets/images/arrow-left.svg';

import {styles} from './styles';
import {ERootStackRoutes, TNavigationProp} from '../../routes/types';
import Input from '../../components/Input';
import {verifyRecoveryPhraseSchema} from '../../validation/verifyRecoveryPhraseSchema';
import {makeSelectGeneratedPhrases} from '../../store/auth/selectors';
import {useScrollBottomOnKeyboard} from '../../utils/keyboardHelpers';
import {useShallowEqualSelector} from '../../store/utils';
import {bottomSpace} from '../../utils/deviceHelpers';

const bgImage = require('../../assets/images/bgimage.png');

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const VerifyRecoveryPhrase = () => {
  const navigation =
    useNavigation<TNavigationProp<ERootStackRoutes.VerifyRecoveryPhrase>>();

  const refs: Record<number, MutableRefObject<TextInput | null>> = {
    2: useRef<TextInput>(null),
    3: useRef<TextInput>(null),
    4: useRef<TextInput>(null),
    5: useRef<TextInput>(null),
    6: useRef<TextInput>(null),
    7: useRef<TextInput>(null),
    8: useRef<TextInput>(null),
    9: useRef<TextInput>(null),
    10: useRef<TextInput>(null),
    11: useRef<TextInput>(null),
    12: useRef<TextInput>(null),
  };

  const seeds = useShallowEqualSelector(makeSelectGeneratedPhrases);

  const [isValidSeeds, setValidSeeds] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({resolver: verifyRecoveryPhraseSchema, mode: 'onChange'});

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmitEditing = useCallback(
    (key: number) => () => {
      const input = refs[key]?.current;
      input && input.focus();
    },
    [refs],
  );

  const handlePressContinue = useCallback(
    (data: FieldValues) => {
      const validateSeeds = (): boolean => {
        const inputSeeds = list
          .reduce((str, item) => {
            const inputVal = data[`input${item}`];
            return `${str} ${inputVal}`;
          }, '')
          .slice(1);
        return inputSeeds === seeds;
      };

      if (validateSeeds()) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {name: ERootStackRoutes.Welcome, params: undefined},
              {
                name: ERootStackRoutes.SignIn,
                params: undefined,
              },
            ],
          }),
        );
      } else {
        setValidSeeds(false);
      }
    },
    [navigation, seeds],
  );

  const scrollRef = useRef<ScrollView | null>(null);
  useScrollBottomOnKeyboard(scrollRef);

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
        contentContainerStyle={styles.content}>
        <Logo width={50} height={50} />
        <Text style={styles.title}>Verify Recovery Phrase</Text>
        <Text style={styles.text}>
          Please confirm your recovery phrase by typing the words in the correct
          order.
        </Text>
        <View style={styles.inputsWrapper}>
          {list.map(item => (
            <Controller
              key={`input-${item}`}
              control={control}
              name={`input${item}`}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  wrapperStyle={styles.inputWrapper}
                  style={styles.input}
                  label={`input ${item}`}
                  onChangeText={(v: string) => {
                    onChange(v);
                    setValidSeeds(true);
                  }}
                  autoCapitalize="none"
                  value={value}
                  onBlur={onBlur}
                  errorMessage={errors[`input${item}`]?.message as string}
                  onSubmitEditing={handleSubmitEditing(item + 1)}
                  inputRef={refs[item]}
                />
              )}
            />
          ))}
        </View>
        {!isValidSeeds ? (
          <Text style={styles.errorText}>Invalid recovery phrases</Text>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isValid}
          style={[styles.button, !isValid && styles.disabledBtn]}
          onPress={handleSubmit(handlePressContinue)}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-bottomSpace} />}
      </ScrollView>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePressBack}>
          <ArrowLeftSvg fill="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default VerifyRecoveryPhrase;
