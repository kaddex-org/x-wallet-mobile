import {Dimensions, StyleSheet} from 'react-native';
import {BOLD_MONTSERRAT, MEDIUM_MONTSERRAT} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },

  header: {
    position: 'absolute',
    top: statusBarHeight + 12,
    left: 12,
    alignItems: 'flex-start',
    width: '100%',
  },

  contentWrapper: {
    width: '100%',
  },
  content: {
    width: '100%',
    paddingTop: 108,
    paddingBottom: bottomSpace,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: Dimensions.get('window').height,
  },

  inputsWrapper: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  inputWrapper: {
    marginBottom: 20,
    width: 100,
  },

  input: {backgroundColor: 'white', paddingHorizontal: 0},

  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    marginTop: 25,
    marginBottom: 51,
  },

  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    marginTop: 25,
    marginBottom: 51,
    textAlign: 'center',
    marginHorizontal: 20,
  },

  errorText: {
    fontFamily: MEDIUM_MONTSERRAT,
    color: 'red',
  },

  button: {
    marginTop: 24,
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
