import {Dimensions, StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  SEMI_BOLD_MONTSERRAT,
} from '../../../../constants/styles';
import {statusBarHeight} from '../../../../utils/deviceHelpers';

const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 8,
  },
  content: {
    minHeight: windowHeight * 0.75 - statusBarHeight - 56,
  },
  title: {
    marginTop: 16,
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  value: {
    marginTop: 4,
    fontSize: 24,
    fontFamily: SEMI_BOLD_MONTSERRAT,
  },
  button: {width: '100%', marginTop: 20},
});
