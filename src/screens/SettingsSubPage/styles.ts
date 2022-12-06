import {StyleSheet} from 'react-native';
import {statusBarHeight} from '../../utils/deviceHelpers';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  backBtnWrapper: {
    position: 'absolute',
    left: 14,
    top: 16,
  },
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(223,223,237,0.5)',
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  content: {
    paddingHorizontal: 20,
    width: '100%',
  },
});
