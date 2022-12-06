import {StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../../constants/styles';

export const styles = StyleSheet.create({
  button: {
    height: 48,
    flex: 1,
    backgroundColor: '#ECECF5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: MAIN_COLOR,
  },
  text: {
    textAlign: 'center',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 14,
    color: MAIN_COLOR,
  },
  activeText: {
    color: 'white',
  },
});
