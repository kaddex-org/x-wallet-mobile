import {StyleSheet} from 'react-native';
import {MAIN_COLOR} from '../../../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 250,
  },
  button: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: MAIN_COLOR,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: MAIN_COLOR,
    fontWeight: 'bold',
  },
  activeButton: {
    backgroundColor: MAIN_COLOR,
  },
  activeText: {
    color: 'white',
  },
});
