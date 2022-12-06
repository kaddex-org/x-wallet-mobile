import {StyleSheet} from 'react-native';
import {
  MEDIUM_MONTSERRAT,
  SEMI_BOLD_MONTSERRAT,
} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#292A45',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 24,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  side: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
  desc: {
    marginTop: 8,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#959AB2',
  },
  halfOpacity: {opacity: 0.5},
});
