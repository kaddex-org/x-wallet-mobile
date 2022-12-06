import {TListItem} from '../ListItem/types';

export type TListDayItem = {
  day: string;
  list: TListItem[];
};
export type TListDayProps = {
  item: TListDayItem;
};
