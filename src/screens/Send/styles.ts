import {StyleSheet} from 'react-native';
import {bottomSpace} from '../../utils/deviceHelpers';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeaderContent: {
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 20,
    width: '100%',
  },
  contentWrapper: {
    width: '100%',
    flex: 1,
  },
  content: {
    width: '100%',
  },
  footer: {
    paddingTop: 16,
    marginBottom: bottomSpace + 16,
    width: '100%',
  },
  margin: {
    width: '100%',
    height: 20,
    marginBottom: 24,
    borderBottomColor: 'rgba(223,223,237,0.5)',
    borderBottomWidth: 1,
  },
  chainWrapper: {
    zIndex: 9,
  },
  chainSecondWrapper: {
    zIndex: 8,
  },
  balanceContainer: {
    marginTop: 16,
    flexDirection: 'column',
  },
  balanceLabel: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  balanceText: {
    backgroundColor: 'rgba(236,236,245,0.5)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 16,
    color: MAIN_COLOR,
    overflow: 'hidden',
  },
});
