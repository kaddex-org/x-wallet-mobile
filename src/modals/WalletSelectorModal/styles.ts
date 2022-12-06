import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 32,
  },
  modalContentWrapper: {
    marginBottom: 8,
    marginHorizontal: 19,
  },
  checkBoxWrapper: {
    marginBottom: 24,
  },
  checkBoxText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
  },
  modalFooter: {
    borderTopColor: 'rgba(223,223,237,0.5)',
    borderTopWidth: 1,
    paddingTop: 24,
    paddingLeft: 20,
    marginBottom: 5,
  },
  itemStyle: {
    marginBottom: 18,
  },
});
