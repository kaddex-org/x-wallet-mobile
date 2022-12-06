import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    marginTop: statusBarHeight,
  },
  container: {
    width: '100%',
    flex: 1,
  },
  contentWrapper: {
    paddingTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 24,
  },
  footer: {
    width: '100%',
    marginBottom: bottomSpace + 24,
  },
  orContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#787B8E',
  },
  orText: {
    marginHorizontal: 12,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#787B8E',
  },
});
