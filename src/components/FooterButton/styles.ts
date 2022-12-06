import {StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  btn: {
    backgroundColor: MAIN_COLOR,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 28,
    borderRadius: 25,
  },
  disabledBtn: {
    backgroundColor: 'rgba(32,38,78,0.5)',
  },
  text: {
    color: 'white',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
  },
});
