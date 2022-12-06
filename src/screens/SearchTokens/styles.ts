import {StyleSheet} from 'react-native';
import {isIos} from '../../constants';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../constants/styles';
import {statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1,
  },
  searchSection: {
    marginHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isIos ? 13 : 3,
    paddingLeft: 16,
    paddingRight: 40,
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
  emptyList: {
    marginTop: 8,
    fontFamily: MEDIUM_MONTSERRAT,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    marginTop: 12,
  },
  contactsWrapper: {
    flex: 1,
  },
  contactsContent: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
