import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 12,
    backgroundColor: 'rgba(255,169,0,0.1)',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  textWrapper: {flex: 1, paddingLeft: 8, paddingRight: 16},
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '600',
    fontSize: 12,
    color: '#CE8900',
  },
  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    marginTop: 2,
    color: '#CE8900',
  },
});
