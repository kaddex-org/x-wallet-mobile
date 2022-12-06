import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 14,
    color: '#787B8E',
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
});
