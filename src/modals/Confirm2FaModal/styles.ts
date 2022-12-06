import {StyleSheet} from 'react-native';
import {
  MEDIUM_MONTSERRAT,
  REGULAR_MONTSERRAT,
  SEMI_BOLD_MONTSERRAT,
} from '../../constants/styles';

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 0,
  },
  modalBlock: {
    borderRadius: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 12,
    paddingVertical: 16,
    color: 'black',
    textAlign: 'center',
  },
  content: {
    borderColor: '#c5c5c5',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
  },
  info: {
    fontFamily: REGULAR_MONTSERRAT,
    marginBottom: 16,
    fontSize: 12,
  },
  inputWrapper: {
    marginVertical: 8,
  },
  input: {
    height: 103,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: '#c5c5c5',
  },
  cancelBtn: {
    paddingVertical: 18,
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderColor: '#c5c5c5',
  },
  submitBtn: {
    paddingVertical: 18,
    flex: 1,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontFamily: SEMI_BOLD_MONTSERRAT,
    color: '#d34532',
    fontWeight: '500',
  },
  submitText: {
    fontSize: 14,
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontWeight: '500',
    color: '#1e8af1',
  },
  disableBtn: {
    opacity: 0.5,
  },
});
