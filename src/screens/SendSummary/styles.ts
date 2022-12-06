import {StyleSheet} from 'react-native';
import {bottomSpace} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  topHeaderContent: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(223,223,237,0.5)',
    paddingTop: 17,
    marginBottom: 14,
    paddingHorizontal: 14,
    width: '100%',
  },
  footer: {
    width: '100%',
    marginBottom: bottomSpace + 24,
  },
});
