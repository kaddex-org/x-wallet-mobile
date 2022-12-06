import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  contentWrapper: {
    marginTop: 20,
    paddingBottom: 8,
    marginBottom: 8,
    paddingLeft: 20,
    paddingRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(223,223,237,0.5)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    color: '#787B8E',
  },
  headerTitle: {
    marginLeft: 3,
    marginBottom: 4,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#7F6A85',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 2,
    paddingBottom: 8,
    marginRight: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  kda: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  usd: {textTransform: 'uppercase', fontWeight: '600', marginLeft: 8},
  leftText: {fontWeight: '700', fontSize: 10},
  bottomHeaderWrapper: {
    marginTop: 24,
    marginBottom: 18,
  },
});
