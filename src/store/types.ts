export type TDefaultRequestState<T = never> = {
  fetching: boolean;
  data: T | null;
  error: unknown | null;
};

export type TAction<T = void> = {
  type: string;
  payload: T;
};

export type TNetworkParams = {
  network: string; // mainnet | testnet | custom
  customHost?: string | undefined | null; // in case network: custom
};
