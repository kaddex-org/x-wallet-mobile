import {TAccount} from '../../../../store/userWallet/types';
import {TContact} from '../../../Contacts/components/Item/types';

export type TAccountsListProps = {
  title: string;
  items: (TAccount | TContact)[];
  setSelectedAccount?: (account: TAccount) => void;
};
