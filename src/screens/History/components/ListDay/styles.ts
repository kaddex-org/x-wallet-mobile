import {StyleSheet} from 'react-native';
import {BOLD_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    paddingTop: 20,
  },
  text: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
});
