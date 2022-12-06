import {StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  MEDIUM_MONTSERRAT,
  REGULAR_MONTSERRAT,
} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#293445',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 32,
  },
  label: {
    fontFamily: BOLD_MONTSERRAT,
    color: '#959AB3',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'column',
    marginTop: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    fontFamily: REGULAR_MONTSERRAT,
    color: 'white',
    paddingVertical: 0,
    paddingLeft: 0,
    paddingRight: 56,
  },
  secureIcon: {
    position: 'absolute',
    right: 0,
  },
  error: {
    fontFamily: MEDIUM_MONTSERRAT,
    marginTop: 8,
    color: 'red',
  },
});
