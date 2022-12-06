import {StyleSheet} from 'react-native';
import {SEMI_BOLD_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontWeight: '600',
    fontSize: 14,
    color: '#787B8E',
    marginLeft: 10,
  },
});
