import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageNoRadius: {
    width: 40,
    height: 40,
  },
  defaultImageBackground: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(65, 31, 84, 0.15)',
    borderWidth: 1,
  },
  imageContent: {
    width: 24,
    height: 24,
  },
});
