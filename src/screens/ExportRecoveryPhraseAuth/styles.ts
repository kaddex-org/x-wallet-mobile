import {Dimensions, StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  screen: {
    marginTop: statusBarHeight,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    minHeight: Dimensions.get('window').height - 76 - statusBarHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 96,
    paddingBottom: bottomSpace,
    width: '100%',
  },
  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: 'rgba(120,123,142,0.5)',
    marginTop: 24,
    marginBottom: 52,
  },

  passwordWrapper: {
    paddingVertical: 32,

    backgroundColor: 'white',

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  input: {
    color: 'black',
  },

  footer: {
    width: '100%',
  },

  button: {
    backgroundColor: MAIN_COLOR,
    width: '100%',
    paddingVertical: 17,
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
});
