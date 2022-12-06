export type TItemProps = {
  item: TNetwork;
  onPress?: () => void;
};

export type TNetwork = {
  id?: string;
  host: string;
  name: string;
  network: string;
  explorerUrl: string;
  isDefault?: boolean;
};
