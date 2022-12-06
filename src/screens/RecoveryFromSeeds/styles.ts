import {Dimensions, StyleSheet} from 'react-native';
import {BOLD_MONTSERRAT, MEDIUM_MONTSERRAT} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: statusBarHeight + 12,
    left: 16,
    alignItems: 'flex-start',
    width: '100%',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    minHeight: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 96,
    paddingBottom: bottomSpace,
    width: '100%',
  },
  text: {
    paddingHorizontal: 24,
    textAlign: 'center',
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    marginTop: 25,
    marginBottom: 51,
  },
  seeds: {
    width: '100%',
    paddingTop: 32,
  },
  password: {
    width: '100%',
    paddingTop: 40,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  confirmPassword: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 32,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  button: {
    backgroundColor: '#FAA41A',
    width: '100%',
    paddingVertical: 17,
  },

  disabledBtn: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: BOLD_MONTSERRAT,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
});
