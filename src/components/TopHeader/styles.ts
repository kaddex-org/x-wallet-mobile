import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 5,
  },
});
