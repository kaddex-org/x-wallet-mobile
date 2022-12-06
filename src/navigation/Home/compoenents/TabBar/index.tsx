import React, {FC} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View} from 'react-native';
import Snackbar from 'react-native-snackbar';

import {styles} from './styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {EHomeTabRoutes} from '../../../../routes/types';

const TabBar: FC<BottomTabBarProps> = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options: itemOptions} = descriptors[route.key];

        const label =
          itemOptions.tabBarLabel !== undefined
            ? itemOptions.tabBarLabel
            : itemOptions.title !== undefined
            ? itemOptions.title
            : route.name;

        const isFocused = state.index === index;

        const isComingSoon = route.name === EHomeTabRoutes.Nft;

        const onPress = () => {
          if (isComingSoon) {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Snackbar.show({
              text: 'Coming Soon!',
              duration: Snackbar.LENGTH_SHORT,
            });
            return;
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as any);
          }
        };

        const {tabBarIcon} = itemOptions;
        return (
          <TouchableOpacity
            activeOpacity={isComingSoon ? 1 : 0.8}
            key={route.name}
            onPress={onPress}
            style={[styles.tabBarItem, isFocused && styles.activeTab]}>
            {tabBarIcon && tabBarIcon({focused: isFocused, size: 0, color: ''})}
            <Text
              style={[
                styles.label,
                isFocused && styles.activeLabel,
                isComingSoon && styles.disabledTab,
              ]}>
              {`${label}`}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
