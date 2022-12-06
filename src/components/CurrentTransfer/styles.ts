import {StyleSheet} from 'react-native';
import {statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: statusBarHeight + 88,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 9999,
  },
  image: {
    position: 'absolute',
    height: 16,
    width: 16,
  },
});
