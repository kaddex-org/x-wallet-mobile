import {StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomColor: 'rgba(223,223,237,0.5)',
    borderBottomWidth: 1,
  },
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 12,
    padding: 8.5,
    backgroundColor: 'white',
    borderRadius: 22,
  },
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'left',
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
    color: MAIN_COLOR,
  },
  time: {
    textAlign: 'left',
    marginTop: 4,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#787B8E',
  },
  amount: {
    marginTop: 6,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#27CA40',
  },
  outgoingAmount: {
    color: '#FF6058',
  },
  ongoingAmount: {
    color: MAIN_COLOR,
  },
  finishButton: {
    backgroundColor: MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  finishButtonText: {
    color: 'white',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
  },
  walletConnectIcon: {
    width: 24,
    height: 24,
  },
});
