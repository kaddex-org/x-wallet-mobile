export type TPairingItem = {
  logo?: string;
  name?: string;
  url?: string;
  topic?: string;
  expiry?: number;
};

export type TPairingItemProps = {
  item: TPairingItem;
  onDelete?: () => void;
};
