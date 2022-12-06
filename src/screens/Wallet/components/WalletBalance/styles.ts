import {StyleSheet} from 'react-native';
import {BOLD_MONTSERRAT, MEDIUM_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  balance: {
    marginTop: 8,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 48,
    color: 'black',
  },
  balanceHeader: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  netWorthContainer: {
    marginBottom: 32,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  netWorth: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: 'black',
  },
  netWorthHeader: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 24,
  },
  button: {
    marginHorizontal: 8,
  },
});
