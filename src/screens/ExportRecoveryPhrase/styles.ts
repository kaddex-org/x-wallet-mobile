import {StyleSheet} from 'react-native';
import {MEDIUM_MONTSERRAT} from '../../constants/styles';
import {statusBarHeight} from '../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    paddingTop: statusBarHeight,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 32,
    paddingHorizontal: 8,
    paddingBottom: 16,
    borderRadius: 25,
    marginBottom: 32,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secretKeys: {
    fontWeight: '400',
    fontSize: 24,
    color: 'black',
    marginHorizontal: 3,
  },
  secretKeysWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(223,223,237,0.5)',
    marginHorizontal: 16,
    paddingBottom: 32,
  },
  secretKeysText: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 8,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 14,
    color: '#787B8E',
    marginVertical: 24,
    width: '100%',
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  footerWrapper: {
    width: '100%',
  },
  itemStyle: {
    marginBottom: 24,
  },
  itemText: {
    fontFamily: MEDIUM_MONTSERRAT,
  },
});
