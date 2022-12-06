import {StyleSheet} from 'react-native';
import {statusBarHeight} from '../../utils/deviceHelpers';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    paddingTop: statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
  },
  form: {
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  backBtnWrapper: {
    position: 'absolute',
    left: 14,
    top: 16,
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
  password: {
    marginTop: 24,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderRadius: 10,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  resetBtn: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgb(159,1,37)',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: MEDIUM_MONTSERRAT,
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
  inputContainer: {
    marginTop: 8,
  },
  input: {
    backgroundColor: 'rgba(236,236,245,0.5)',
    paddingTop: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderRadius: 10,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: MAIN_COLOR,
  },
  icon: {
    right: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
  footerBtn: {
    marginHorizontal: 0,
  },
});
