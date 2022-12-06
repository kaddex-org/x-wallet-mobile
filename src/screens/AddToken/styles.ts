import {StyleSheet} from 'react-native';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusBarHeight,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 24,
  },
  footer: {
    width: '100%',
    paddingBottom: bottomSpace + 24,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 140,
    height: 40,
  },
  info: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  value: {
    flex: 0.5,
    fontSize: 18,
    textAlign: 'right',
  },
});
