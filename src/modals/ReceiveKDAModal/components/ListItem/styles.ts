import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 24,
    paddingRight: 20,
    paddingLeft: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(223,223,237,0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  text: {
    marginTop: 3,
    width: 232,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
});
