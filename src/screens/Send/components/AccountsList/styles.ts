import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  title: {
    marginLeft: 3,
    marginBottom: 4,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#7F6A85',
  },
});
