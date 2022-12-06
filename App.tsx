import React, {useEffect, useMemo} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import remoteConfig from '@react-native-firebase/remote-config';
import {Platform, StatusBar} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import {PactProvider} from './src/contexts/Pact';
import AppStack from './src/navigation/AppStack';
import api from './src/api';
import {makeSelectIsAuthorized} from './src/store/auth/selectors';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {SERVER_REMOTE_URL} from './src/api/constants';
import WalletConnect from './src/utils/walletConnect';

const App = () => {
  const isAuthorized = useSelector(makeSelectIsAuthorized);

  useEffect(() => {
    RNBootSplash.hide({fade: true});
    remoteConfig()
      .setDefaults({
        SERVER_REMOTE_URL: SERVER_REMOTE_URL,
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(() =>
        remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: 30000,
        }),
      )
      .then(() => {
        try {
          const remoteServerURL = remoteConfig()
            .getValue('SERVER_REMOTE_URL')
            .asString();
          if (remoteServerURL) {
            api.defaults.baseURL = remoteServerURL;
          }
        } catch (e) {}
      });
  }, []);

  const statusBarStyle = useMemo(
    () =>
      Platform.OS === 'ios'
        ? !isAuthorized
          ? 'light-content'
          : 'dark-content'
        : 'light-content',
    [isAuthorized],
  );

  const statusBarColor = useMemo(
    () => (Platform.OS === 'ios' ? 'transparent' : 'black'),
    [],
  );

  const appTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: isAuthorized ? '#f9f9fe' : 'black',
      },
    }),
    [isAuthorized],
  );

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarColor}
        translucent={true}
      />
      <NavigationContainer theme={appTheme}>
        <AppStack />
      </NavigationContainer>
      <WalletConnect />
      <Toast />
    </>
  );
};

const AppContainer = () => {
  return (
    <Provider store={store}>
      <PactProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </PactProvider>
    </Provider>
  );
};

export default AppContainer;
