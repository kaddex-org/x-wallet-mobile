import {StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
} from '../../constants/styles';

export const styles = StyleSheet.create({
  content: {
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  itemContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  center: {
    flexDirection: 'column',
  },
  logo: {
    width: 32,
    height: 32,
  },
  title: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
    color: MAIN_COLOR,
  },
  link: {
    marginTop: 4,
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 12,
    color: '#787B8E',
  },
  chainContainer: {
    marginTop: 12,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(223,223,237,0.5)',
    width: '100%',
    flexDirection: 'column',
  },
  chainTitle: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  chainWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  chainLabel: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
    color: MAIN_COLOR,
    marginTop: 16,
    marginBottom: 8,
  },
  chainText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  chainDescription: {
    flex: 1,
    marginLeft: 12,
    textAlign: 'right',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '600',
    fontSize: 12,
    color: '#787B8E',
  },
  footer: {
    paddingTop: 20,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(223,223,237,0.5)',
  },
  statusWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  updateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(223,223,237,0.5)',
  },
  statusText: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  time: {
    textAlign: 'right',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '600',
    fontSize: 12,
    color: '#787B8E',
  },
  itemStyle: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  itemRed: {
    color: 'red',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
