import {AppState, Platform} from 'react-native';
import {useEffect, useState} from 'react';
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from 'react-native-iphone-x-helper';

export function useAppState() {
  const [appState, setAppState] = useState<any>('active');

  useEffect(() => {
    function handleAppStateChange(nextAppState: any) {
      setAppState(nextAppState);
    }
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => appStateListener.remove();
  }, [appState]);

  return appState;
}

export const bottomSpace = getBottomSpace();
export const statusBarHeight =
  getStatusBarHeight() + (isIphoneX() ? 8 : Platform.OS === 'android' ? 4 : 0);
