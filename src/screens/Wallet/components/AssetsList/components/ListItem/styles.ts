import {StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
} from '../../../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(223,223,237,0.5)',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftSide: {
    flex: 1,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginLeft: 12,
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
    color: MAIN_COLOR,
  },
  currency: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#787B8E',
  },
});
