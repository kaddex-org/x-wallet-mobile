import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 12,
    backgroundColor: '#fef7e6',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  wrapperRed: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 12,
    backgroundColor: '#f4c7c7',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  wrapperCenter: {
    justifyContent: 'center',
  },
  wrapperCenterIcon: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  textWrapper: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 16,
  },
  textWrapperCenter: {
    flex: undefined,
    paddingLeft: 0,
    paddingRight: 8,
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '600',
    fontSize: 12,
    color: '#CE8900',
  },
  titleBlack: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '600',
    fontSize: 12,
    color: '#212121',
  },
  centerText: {
    textAlign: 'center',
    paddingLeft: 8,
  },
  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    marginTop: 2,
    color: '#CE8900',
  },
});
