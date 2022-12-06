import {StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  MAIN_COLOR,
  MEDIUM_MONTSERRAT, SEMI_BOLD_MONTSERRAT,
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
    justifyContent: 'space-between',
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
  },
  iconWrapper: {
    marginTop: 2,
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
    textAlign: 'left',
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
    color: MAIN_COLOR,
  },
  link: {
    marginTop: 4,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'left',
    color: '#787B8E',
  },
  dateTitle: {
    marginTop: 12,
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: MAIN_COLOR,
  },
  date: {
    marginTop: 4,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: MAIN_COLOR,
  },
  delete: {
    marginLeft: 12,
  },
});
