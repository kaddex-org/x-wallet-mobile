import {StyleSheet} from 'react-native';
import {statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1,
  },
  body: {
    flex: 1,
  },
  contactsWrapper: {
    flex: 1,
  },
  contactsContent: {
    paddingTop: 18,
    paddingHorizontal: 24,
  },
});
