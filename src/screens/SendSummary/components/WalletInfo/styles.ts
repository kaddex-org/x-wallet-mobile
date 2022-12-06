import {StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  headerLeftText: {
    fontSize: 12,
    marginLeft: 9,
  },
  headerRightTextWrapper: {
    backgroundColor: 'rgba(32,38,78,0.05)',
    paddingVertical: 8,
    alignItems: 'center',
    width: 59,
    borderRadius: 32,
    marginLeft: 8,
  },
  headerRightText: {
    fontSize: 12,
  },
  headerRight: {
    flexDirection: 'row',
  },
  mainText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 45,
    color: 'black',
  },
  input: {
    paddingHorizontal: 10,
    maxWidth: '75%',
    minWidth: 20,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 8,
  },
  inputWrapper: {
    marginLeft: 8,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {},
  footer: {
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  footerText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
  },
  footerLeftText: {
    color: MAIN_COLOR,
  },
  footerRightText: {
    color: 'rgba(120,123,142,0.75)',
  },
});
