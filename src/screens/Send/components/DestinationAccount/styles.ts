import {StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(236,236,245,0.5)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: MAIN_COLOR,
  },
  selectedAccountWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(236,236,245,0.5)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingLeft: 14,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedAccountText: {
    color: MAIN_COLOR,
    fontSize: 16,
  },
  scan: {
    width: 24,
    height: 24,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
