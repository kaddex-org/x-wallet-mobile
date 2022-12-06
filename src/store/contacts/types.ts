import {TContact} from '../../screens/Contacts/components/Item/types';

export type TContactsState = {
  contactsList: TContact[];
  selectedContact: TContact | null;
};
