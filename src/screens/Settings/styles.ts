import {StyleSheet} from 'react-native';
import {statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    width: '100%',
    paddingTop: statusBarHeight,
    paddingHorizontal: 24,
  },
  footer: {
    marginTop: 24,
    borderTopColor: 'rgba(223, 223, 237, 0.5)',
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingTop: 48,
    width: '100%',
    paddingHorizontal: 24,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});
