import {StyleSheet} from 'react-native';
import {isIos} from '../../constants';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    paddingTop: statusBarHeight,
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  footer: {
    borderTopWidth: 1,
    width: '100%',
    paddingTop: 16,
    paddingBottom: bottomSpace + 16,
    borderTopColor: 'rgba(223,223,237,0.5)',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 19,
  },
  inputSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isIos ? 13 : 3,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: 'rgba(236,236,245,0.5)',
    borderRadius: 10,
  },
  input: {
    paddingHorizontal: 16,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: MAIN_COLOR,
    width: '100%',
  },
  footerButton: {
    marginTop: 16,
    marginHorizontal: 19,
  },
});
