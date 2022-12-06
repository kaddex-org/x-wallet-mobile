import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  textStyle: {
    textDecorationLine: 'none',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  textContainerStyle: {
    marginLeft: 8,
    width: '90%',
  },
  iconStyle: {
    borderColor: 'rgba(120,123,142,0.5)',
  },
});
