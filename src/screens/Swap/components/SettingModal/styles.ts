import {StyleSheet} from 'react-native';
import {MAIN_COLOR, MEDIUM_MONTSERRAT} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  slippageToleranceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: MAIN_COLOR,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingRight: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  percent: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -8}],
    color: 'black',
    fontWeight: 'bold',
  },
  title: {
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
    marginTop: 25,
    marginBottom: 12,
  },
  deadlineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
});
