import {StyleSheet} from 'react-native';
import {isIos} from '../../../../constants';
import {
  BOLD_MONTSERRAT,
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 16,
  },
  input: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    color: MAIN_COLOR,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchSection: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isIos ? 13 : 3,
    paddingLeft: 16,
    paddingRight: 40,
    backgroundColor: 'rgba(236,236,245,0.5)',
    borderRadius: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  token: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenName: {
    fontFamily: MEDIUM_MONTSERRAT,
    marginLeft: 8,
    fontWeight: 'bold',
    color: MAIN_COLOR,
  },
  selected: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: 'bold',
    color: MAIN_COLOR,
  },
  emptyText: {
    marginTop: 16,
    fontFamily: MEDIUM_MONTSERRAT,
    textAlign: 'center',
  },
});
