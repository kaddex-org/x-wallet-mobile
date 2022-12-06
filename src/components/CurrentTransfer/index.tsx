import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import {
  makeSelectShowTransferBubble,
  makeSelectTransferResult,
} from '../../store/transfer/selectors';
import Logo from '../../assets/images/logo.svg';
import ProgressCircle from 'react-native-progress/CircleSnail';
import {ERootStackRoutes} from '../../routes/types';
import {useShallowEqualSelector} from '../../store/utils';
import {makeSelectIsAuthorized} from '../../store/auth/selectors';

const hitSlop = {
  bottom: 8,
  top: 8,
  right: 8,
  left: 8,
};
const progressColors = ['#EE0893', '#03FCFB', '#FFA501'];

const CurrentTransfer = React.memo(() => {
  const navigation = useNavigation<any>();

  const isAuthorized = useSelector(makeSelectIsAuthorized);

  const transfer = useShallowEqualSelector(makeSelectTransferResult);
  const showBubble = useSelector(makeSelectShowTransferBubble);

  const onPressProgress = useCallback(() => {
    if (transfer?.status === 'pending') {
      navigation.navigate(ERootStackRoutes.SendProgress);
    }
  }, [transfer, navigation]);

  if (!isAuthorized || !showBubble || transfer?.status !== 'pending') {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={onPressProgress}
      activeOpacity={0.8}
      hitSlop={hitSlop}
      style={styles.container}>
      <ProgressCircle
        animated={true}
        indeterminate={true}
        color={progressColors}
        size={46}
        thickness={3}
      />
      <View style={styles.image}>
        <Logo width="16" height="16" />
      </View>
    </TouchableOpacity>
  );
});

export default CurrentTransfer;
