import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 24,
    paddingHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  fromWrapper: {flex: 1},
  toWrapper: {flex: 1},
  centerWrapper: {
    marginHorizontal: 8,
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: 'rgba(223,223,237,0.5)',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  text: {color: 'black'},
  chainId: {
    marginLeft: 33,
    marginTop: -5,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#787B8E',
  },
});
