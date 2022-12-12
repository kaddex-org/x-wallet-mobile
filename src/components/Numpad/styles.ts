import {StyleSheet} from 'react-native';
import {REGULAR_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  bodyWrapper: {
    alignItems: 'center',
  },
  smallCirclesWrapper: {
    flexDirection: 'row',
  },
  smallCircle: {
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#959AB2',
    width: 12,
    height: 12,
    marginHorizontal: 5,
  },
  smallCircleWhite: {
    backgroundColor: 'white',
  },
  numpadWrapper: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 300,
  },
  numberWrapper: {
    borderWidth: 1,
    borderColor: 'rgba(149, 154, 178, 0.5)',
    borderRadius: 32,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  number: {
    fontFamily: REGULAR_MONTSERRAT,
    fontWeight: '400',
    fontSize: 24,
    color: 'white',
  },
  noBorder: {borderWidth: 0},
});
