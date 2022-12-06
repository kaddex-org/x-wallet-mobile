import {TWalletItemProps} from '../../../../components/WalletItem/types';

export type TAccountItemProps = {
  isFirst?: boolean;
  onPress?: () => void;
} & TWalletItemProps;
