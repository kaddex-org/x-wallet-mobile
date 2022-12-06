import {Dimensions, StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT, SEMI_BOLD_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  bgImage: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    minHeight: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  main: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  welcome: {
    fontFamily: MEDIUM_MONTSERRAT,
    marginTop: 40,
    marginBottom: 18,
    fontSize: 32,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  smText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 12,
    fontWeight: '500',
    color: '#959AB2',
  },
  cards: {
    marginTop: 56,
    width: '100%',
  },
  loginButton: {
    marginTop: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
  },
});
