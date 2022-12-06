import {StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../../../constants/styles';
import {statusBarHeight} from '../../../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  header: {
    paddingTop: statusBarHeight + 16,
    paddingBottom: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(223,223,237,0.5)',
    backgroundColor: 'white',
    zIndex: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(65, 31, 84, 0.15)',
    borderRadius: 60,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 5,
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginRight: 16,
    color: MAIN_COLOR,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginLeft: 8,
  },
  dropdownContainer: {
    width: 170,
  },
});
