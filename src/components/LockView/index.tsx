import React, {useEffect, useState} from 'react';
import {Animated, View, ImageBackground} from 'react-native';
import {styles} from './styles';
import LogoSvg from '../../assets/images/logo.svg';
import {useAppState} from '../../utils/deviceHelpers';

const bgImage = require('../../assets/images/bgimage.png');

const LockView = React.memo(() => {
  const appState = useAppState();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animation] = useState<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    if (appState !== 'active') {
      setIsVisible(true);
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        animation.setValue(0);
      });
    }
  }, [appState]);

  if (!isVisible) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.screen,
        {
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={styles.bgImage}>
        <View style={styles.container}>
          <LogoSvg />
        </View>
      </ImageBackground>
    </Animated.View>
  );
});

export default LockView;
