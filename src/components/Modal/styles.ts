import {Platform, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import {MEDIUM_MONTSERRAT} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 0,
  },
  wrapper: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 25,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 27,
    borderBottomColor: 'rgba(223, 223, 237, 0.5)',
    borderBottomWidth: 1,
  },
  logoWrapper: Platform.select({
    ios: {
      width: 89,
      height: 89,
      marginTop: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 45,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    default: {
      width: 89,
      height: 89,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 85,
      backgroundColor: 'white',
      borderRadius: 45,
      elevation: 5,
    },
  }),
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
  titleWithLogo: Platform.select({
    ios: {
      marginTop: 24,
      fontSize: 24,
      marginBottom: 5,
    },
    default: {
      marginTop: 53,
      fontSize: 24,
      marginBottom: 5,
    },
  }),
  closeBtnWrapper: {
    position: 'absolute',
    right: 14,
    top: 0,
  },
  leftItemWrapper: {
    position: 'absolute',
    left: 20,
    top: 0,
  },
  contentWrapper: {
    width: '100%',
    minHeight: windowHeight * 0.65 - statusBarHeight,
    maxHeight: windowHeight * 0.8 - statusBarHeight - 56,
  },
  content: {
    width: '100%',
    paddingBottom: bottomSpace + 24,
  },
});
