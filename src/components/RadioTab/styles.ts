import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  optionWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  optionContentWrapper: {
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  label: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
});
