import {StyleSheet} from 'react-native';
import {
  REGULAR_MONTSERRAT,
  SEMI_BOLD_MONTSERRAT,
} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  item: {
    marginVertical: 8,
    color: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontSize: 14,
    marginRight: 12,
  },
  text: {
    fontFamily: REGULAR_MONTSERRAT,
    fontSize: 14,
  },
});
