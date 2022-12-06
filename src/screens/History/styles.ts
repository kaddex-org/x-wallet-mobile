import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';
import {statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: '#f8f8fd',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '100%',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontFamily: MEDIUM_MONTSERRAT,
    textAlign: 'center',
  },
});
