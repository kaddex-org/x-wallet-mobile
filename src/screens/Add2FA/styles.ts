import {StyleSheet} from 'react-native';
import {
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
  REGULAR_MONTSERRAT,
} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  headerTitle: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
  scroll: {
    width: '100%',
    flex: 1,
  },
  content: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  text: {
    color: MAIN_COLOR,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: MEDIUM_MONTSERRAT,
  },
  block: {
    marginTop: 20,
  },
  qrCode: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: 24,
  },
  inputWrapper: {
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  footer: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    width: '100%',
    paddingTop: 20,
    paddingBottom: bottomSpace + 16,
    borderTopColor: 'rgba(223,223,237,0.5)',
  },
  footerBtn: {
    marginHorizontal: 0,
  },
  loadingWrapper: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: REGULAR_MONTSERRAT,
    marginBottom: 16,
    fontSize: 12,
  },
});
