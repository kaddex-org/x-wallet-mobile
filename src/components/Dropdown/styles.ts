import {StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  dropdownStyle: {
    borderWidth: 1,
    borderColor: 'rgba(65, 31, 84, 0.15)',
    borderRadius: 15,
  },
  containerStyle: {
    width: 140,
  },
  labelStyle: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: MAIN_COLOR,
  },
  itemStyle: {
    paddingHorizontal: 22,
    paddingVertical: 4,
    backgroundColor: 'white',
    zIndex: 9999,
  },
  search: {
    borderBottomColor: 'rgba(65, 31, 84, 0.15)',
  },
  modalTitle: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 12,
    paddingVertical: 16,
    color: 'black',
  },
  itemLabelStyle: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: MAIN_COLOR,
  },
  dropdownContainerStyle: {
    borderRadius: 0,
    borderColor: 'rgba(65, 31, 84, 0.15)',
  },
  listContainerStyle: {
    paddingVertical: 8,
  },
});
