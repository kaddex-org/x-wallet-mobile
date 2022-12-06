import {Dimensions, StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT, SEMI_BOLD_MONTSERRAT} from '../../constants/styles';
import {statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: Dimensions.get('window').height,
  },
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
    fontSize: 16,
    fontWeight: '500',
    color: '#959AB2',
    textAlign: 'left',
    marginBottom: 10,
  },

  secretWords: {
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },

  infoWrapper: {
    marginHorizontal: 20,
    marginVertical: 32,
  },

  checkBoxWrapper: {
    margin: 20,
  },

  checkBoxText: {color: 'white'},

  button: {
    backgroundColor: '#FAA41A',
    width: '100%',
    paddingVertical: 17,
  },
  buttonText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
});
