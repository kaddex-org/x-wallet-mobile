import {StyleSheet} from 'react-native';
import {
  BOLD_MONTSERRAT,
  MEDIUM_MONTSERRAT,
  REGULAR_MONTSERRAT,
} from '../../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'rgb(223,223,237)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftBlock: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  rightBlock: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    fontSize: 12,
    color: '#787B8E',
    textTransform: 'uppercase',
  },
  usd: {
    marginTop: 4,
    color: 'grey',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: MEDIUM_MONTSERRAT,
  },
  balance: {
    fontFamily: REGULAR_MONTSERRAT,
    textAlign: 'right',
    color: 'black',
    fontSize: 12,
  },
  inputWrapper: {
    marginTop: 10,
  },
  input: {
    fontSize: 18,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 8,
    paddingBottom: 0,
    fontFamily: MEDIUM_MONTSERRAT,
    backgroundColor: 'transparent',
  },
  tokenSelect: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(236,236,245,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {marginLeft: 4, transform: [{rotate: '450deg'}]},
  coinTitle: {
    fontFamily: MEDIUM_MONTSERRAT,
    marginLeft: 4,
    marginHorizontal: 1,
    fontWeight: '500',
    color: 'black',
  },
});
