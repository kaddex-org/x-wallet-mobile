import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  modalContainer: {},
  qrCodeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  qrCodeImage: {
    width: 200,
    height: 200,
  },
  footer: {
    paddingVertical: 24,
    paddingRight: 20,
    paddingLeft: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(223,223,237,0.5)',
  },
  footerTitle: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  footerText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
    marginTop: 14,
  },
});
