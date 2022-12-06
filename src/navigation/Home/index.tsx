import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './compoenents/TabBar';
import {HOME_TAB_SCREENS} from '../../routes';
import {EHomeTabRoutes} from '../../routes/types';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={EHomeTabRoutes.Wallet}
        tabBar={props => <TabBar {...props} />}>
        {HOME_TAB_SCREENS.map(props => (
          <Tab.Screen {...props} key={props.name} />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default Home;
