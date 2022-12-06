import {StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomColor: 'rgba(223,223,237,0.5)',
    borderBottomWidth: 1,
  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  logo: {
    width: 32,
    height: 32,
  },
  title: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
    color: MAIN_COLOR,
    textAlign: 'left',
  },
  link: {
    marginTop: 4,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 12,
    color: '#787B8E',
  },
  detail: {
    width: 24,
    height: 24,
    transform: [{rotate: '180deg'}],
  },
});
