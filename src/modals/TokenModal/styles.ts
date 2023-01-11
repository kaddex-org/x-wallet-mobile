import {Dimensions, StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
} from '../../constants/styles';

const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 12,
  },
  modalContentWrapper: {
    marginBottom: 8,
    marginHorizontal: 19,
  },
  checkBoxWrapper: {
    marginBottom: 24,
  },
  warning: {
    marginBottom: 8,
  },
  modalFooter: {
    borderTopColor: 'rgba(223,223,237,0.5)',
    borderTopWidth: 1,
    paddingTop: 29,
    paddingLeft: 21,
    marginBottom: 5,
  },
  itemStyle: {
    marginTop: 20,
  },
  modalStyle: {
    minHeight: windowHeight * 0.35 - 48,
  },
  distributionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: 'rgba(223,223,237,0.5)',
    borderBottomWidth: 1,
  },
  distributionTokenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  distributionButtonContainer: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tokenAmount: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
    color: MAIN_COLOR,
  },
  tokenCurrency: {
    marginTop: 4,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#787B8E',
  },
  chainId: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  iconWrapper: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MAIN_COLOR,
    borderRadius: 16,
    height: 32,
    width: 32,
  },
  emptyText: {
    marginTop: 16,
    fontFamily: MEDIUM_MONTSERRAT,
    textAlign: 'center',
  },
});
