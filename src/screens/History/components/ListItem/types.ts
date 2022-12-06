import {TActivity, TActivityStatus} from '../../../../store/history/types';

export type TListItem = {
  title: string;
  time: string;
  amount: number;
  status: TActivityStatus;
};
export type TListItemProps = {
  item: TListItem & TActivity;
  onPress?: () => void;
};
