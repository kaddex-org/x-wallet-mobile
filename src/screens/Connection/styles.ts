import {Dimensions, StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';
import {statusBarHeight} from '../../utils/deviceHelpers';

const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: '#f8f8fd',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    width: '100%',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontFamily: MEDIUM_MONTSERRAT,
    textAlign: 'center',
  },
  connectButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectIcon: {
    width: 28,
    height: 28,
  },
  infoButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    width: 24,
    height: 24,
  },
  infoModalStyle: {
    minHeight: windowHeight * 0.4 - 48,
  },
});
