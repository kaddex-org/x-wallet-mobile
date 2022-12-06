import {TActivity} from '../../store/history/types';
import {TListItem} from '../../screens/History/components/ListItem/types';

export type TTransactionDetailsModalProps = {
  details: TActivity & TListItem;
  isVisible: boolean;
  toggle: () => void;
};
