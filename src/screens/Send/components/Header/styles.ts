import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../../../constants/styles';
import {statusBarHeight} from '../../../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  header: {
    display: 'flex',
    width: '100%',
    paddingTop: statusBarHeight + 16,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(223,223,237,0.5)',
  },
  backBtnWrapper: {
    position: 'absolute',
    left: 14,
    top: statusBarHeight + 16,
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
});
