import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 32,
  },
  modalContentWrapper: {
    marginBottom: 8,
    marginHorizontal: 19,
    zIndex: 1,
  },
  checkBoxWrapper: {
    marginBottom: 24,
  },
  checkBoxText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
  },
  modalFooter: {
    zIndex: 0,
    borderTopColor: 'rgba(223,223,237,0.5)',
    borderTopWidth: 1,
    paddingTop: 29,
    paddingLeft: 21,
    marginBottom: 5,
  },
});
