import {MutableRefObject, useLayoutEffect} from 'react';
import {Keyboard, Platform} from 'react-native';

export const useScrollBottomOnKeyboard = (scrollRef: MutableRefObject<any>) => {
  useLayoutEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      if (Platform.OS === 'android') {
        setTimeout(() => {
          scrollRef?.current?.scrollToEnd({animated: true});
        }, 600);
      }
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      if (Platform.OS === 'android') {
        scrollRef?.current?.scrollToEnd({animated: true});
      }
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
};

export const useInputBlurOnKeyboard = (inputRef: MutableRefObject<any>) => {
  useLayoutEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      if (Platform.OS === 'android') {
        inputRef?.current?.blur();
      }
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);
};
