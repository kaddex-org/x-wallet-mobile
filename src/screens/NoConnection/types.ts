import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ERootStackRoutes, TRootStackParamList} from '../../routes/types';

export type TLoginProps = NativeStackScreenProps<
  TRootStackParamList,
  ERootStackRoutes.Login
>;

export type TLoginScreenNavigation = TLoginProps['navigation'];
