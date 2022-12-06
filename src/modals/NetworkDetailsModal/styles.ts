import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 2,
  },
  modalContentWrapper: {},
  image: {
    width: 71.63,
    height: 71.63,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(223,223,237,0.5)',
  },
  section: {
    paddingVertical: 24,
    paddingHorizontal: 28,
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },

  modalFooter: {
    borderTopColor: 'rgba(223,223,237,0.5)',
    borderTopWidth: 1,
    paddingTop: 28,
    paddingLeft: 20,
    marginBottom: 5,
  },
  itemStyle: {
    marginBottom: 18,
  },
});
