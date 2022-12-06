import {StyleSheet} from 'react-native';
import {BOLD_MONTSERRAT, MAIN_COLOR} from '../../../../../../constants/styles';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: 159,
    height: 50,
    backgroundColor: MAIN_COLOR,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    color: 'white',
    marginLeft: 10,
  },
});
