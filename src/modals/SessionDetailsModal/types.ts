import {TSessionItem} from '../../screens/Connection/components/SessionItem/types';

export type TTransactionDetailsModalProps = {
  details: TSessionItem;
  isVisible: boolean;
  toggle: () => void;
  onDelete: () => void;
};
