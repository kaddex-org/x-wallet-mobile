import {StyleSheet} from 'react-native';
import {BOLD_MONTSERRAT} from '../../constants/styles';
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockWrapper: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#293445',
    borderRadius: 25,
  },
  unlockText: {
    fontFamily: BOLD_MONTSERRAT,
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    marginTop: 28,
  },
  bodyWrapper: {
    marginTop: 100,
  },
});
