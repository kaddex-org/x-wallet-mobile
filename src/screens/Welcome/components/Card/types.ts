export type TCardProps = {
  title: string;
  description?: string;
  icon: JSX.Element;
  onPress?: () => void;
  disabled?: boolean;
};
