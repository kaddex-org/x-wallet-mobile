import {Dimensions, StyleSheet} from 'react-native';
import {
  REGULAR_MONTSERRAT,
  SEMI_BOLD_MONTSERRAT,
} from '../../../../constants/styles';
import {statusBarHeight} from '../../../../utils/deviceHelpers';

const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 8,
  },
  detailContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(223,223,237,0.5)',
  },
  content: {
    minHeight: windowHeight * 0.75 - statusBarHeight - 56,
  },
  footer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  item: {
    marginVertical: 8,
    color: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#000000',
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontSize: 14,
    marginRight: 12,
  },
  text: {
    color: '#000000',
    fontFamily: REGULAR_MONTSERRAT,
    fontSize: 14,
  },
  button: {width: '100%', marginTop: 20},
});
