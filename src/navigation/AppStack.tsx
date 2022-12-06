import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ERootStackRoutes, TRootStackParamList} from '../routes/types';
import {APP_STACK_SCREENS, AUTH_STACK_SCREENS} from '../routes';
import CurrentTransfer from '../components/CurrentTransfer';
import LockView from '../components/LockView';
import {useSelector} from 'react-redux';
import {makeSelectIsAuthorized} from '../store/auth/selectors';

const Stack = createNativeStackNavigator<TRootStackParamList>();

const AppStack = () => {
  const isAuthorized = useSelector(makeSelectIsAuthorized);
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={ERootStackRoutes.Welcome}>
        {!isAuthorized ? (
          <>
            {AUTH_STACK_SCREENS.map(props => (
              <Stack.Screen {...props} key={props.name} />
            ))}
          </>
        ) : (
          <>
            {APP_STACK_SCREENS.map(props => (
              <Stack.Screen {...props} key={props.name} />
            ))}
          </>
        )}
      </Stack.Navigator>
      <CurrentTransfer />
      <LockView />
    </>
  );
};

export default AppStack;
