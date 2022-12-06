import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  bgImage: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
