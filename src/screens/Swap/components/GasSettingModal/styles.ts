import {Dimensions, StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
    marginBottom: 20,
  },
  gasStation: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 14,
    fontWeight: '600',
  },
  inputWrapper: {
    marginBottom: 24,
  },
  info: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    paddingTop: 20,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 14,
    color: MAIN_COLOR,
    flex: 1,
    marginRight: 12,
  },
  value: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontSize: 15,
    textAlign: 'right',
  },
  contentStyle: {
    height: Dimensions.get('window').height - 200,
  },
});
