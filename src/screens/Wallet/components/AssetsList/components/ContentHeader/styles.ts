import {StyleSheet} from 'react-native';
import {BOLD_MONTSERRAT} from '../../../../../../constants/styles';

export const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    flexDirection: 'row',
    marginRight: 11,
    marginLeft: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusSvgWrapper: {
    borderRadius: 19,
    padding: 8,
    marginLeft: 4,
  },
  searchSvgWrapper: {
    borderRadius: 19,
    padding: 8,
    marginLeft: 20,
  },
});
