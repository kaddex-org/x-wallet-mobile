import {TValues} from "../CurrencyInput/types";

export type TConfirmModal = {
  close: () => void;
  isVisible: boolean;
  firstToken: TValues;
  secondToken: TValues;
  priceImpact: string;
  onConfirm: () => void;
};
