import {StyleSheet} from 'react-native';
import {
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
  SEMI_BOLD_MONTSERRAT,
} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(223, 223, 237, 0.5)',
    paddingTop: 24,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    padding: 9,
    backgroundColor: MAIN_COLOR,
    borderRadius: 21,
  },
  rightSide: {
    marginLeft: 12,
  },
  rightSideWithoutIcon: {
    marginLeft: 0,
  },
  title: {
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontWeight: '600',
    fontSize: 16,
    color: MAIN_COLOR,
  },
  text: {
    marginTop: 9,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#787B8E',
    width: '100%',
  },
});
