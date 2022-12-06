import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {marginTop: 10, zIndex: 10},
  label: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  dropdownContainer: {width: 180},
  dropdownStyle: {
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'rgba(236,236,245,0.5)',
    height: 50,
    paddingHorizontal: 16,
  },
  dropdownLabel: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
  },
  dropdownPlaceholder: {
    color: '#787B8E',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
  },
  error: {
    fontFamily: MEDIUM_MONTSERRAT,
    marginTop: 4,
    color: 'red',
  },
});
