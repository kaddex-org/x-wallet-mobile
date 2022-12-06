import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT, REGULAR_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  contentWrapper: {
    marginBottom: 8,
    marginHorizontal: 19,
  },
  checkBoxContainer: {
    flexDirection: 'column',
  },
  checkBoxWrapper: {
    marginBottom: 24,
  },
  checkBoxText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
  },
  accountText: {
    fontFamily: REGULAR_MONTSERRAT,
    fontWeight: '400',
    fontSize: 12,
  },
  redButton: {
    marginTop: 16,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FF6058',
    padding: 12,
  },
  greenButton: {
    marginTop: 16,
    width: '100%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#27CA40',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
  },
});
