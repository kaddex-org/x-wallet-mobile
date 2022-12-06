import {StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  content: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(223,223,237,0.5)',
  },
  textsWrapper: {width: '100%', alignItems: 'flex-start'},
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 45,
    color: '#27CA40',
  },
  titleRed: {
    color: '#FF6058',
  },
  titleBlack: {
    color: MAIN_COLOR,
  },
  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgba(120,123,142,0.75)',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    paddingTop: 32,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(223,223,237,0.5)',
  },
  statusLabel: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  statusWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  time: {
    textAlign: 'right',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '600',
    fontSize: 12,
    color: '#787B8E',
  },
  requestKeyTitle: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 32,
  },
  requestKeyText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  contKeyTitle: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 32,
  },
  contKeyText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
});
