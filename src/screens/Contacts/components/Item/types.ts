export type TContact = {
  id: string;
  contactName: string;
  accountName: string;
  chainId: string;
};

export type TItemProps = {
  item: TContact;
  onPress?: () => void;
};
