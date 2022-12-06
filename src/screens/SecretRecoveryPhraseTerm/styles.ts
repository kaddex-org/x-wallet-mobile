import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';
import {bottomSpace, statusBarHeight} from '../../utils/deviceHelpers';

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
    width: '100%',
  },
  content: {
    width: '100%',
    paddingTop: 108,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    marginTop: 25,
    marginBottom: 51,
  },
  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 16,
    fontWeight: '500',
    color: '#959AB2',
    textAlign: 'left',
    marginBottom: 10,
  },
  infoWrapper: {
    marginHorizontal: 20,
  },
  checkBoxWrapper: {
    margin: 20,
    marginLeft: 25,
    paddingRight: 4,
  },
  footer: {
    flexDirection: 'column',
    width: '100%',
    paddingBottom: bottomSpace,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkBoxIcon: {
    marginTop: 4,
  },
  checkBoxText: {
    color: 'white',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FAA41A',
    width: '100%',
    paddingVertical: 17,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
});
