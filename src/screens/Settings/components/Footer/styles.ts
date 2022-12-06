import {StyleSheet} from 'react-native';
import {
  MEDIUM_MONTSERRAT,
  SEMI_BOLD_MONTSERRAT,
} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    borderTopColor: 'rgba(223, 223, 237, 0.5)',
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingTop: 24,
    paddingBottom: 4,
    width: '100%',
  },
  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#787B8E',
    marginBottom: 15,
  },
  tipsWrapper: {
    marginTop: 0,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipTitle: {
    color: '#787B8E',
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 8,
  },
});
