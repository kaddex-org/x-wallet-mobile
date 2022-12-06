export type TTokens = {
  stage: {
    KDA: TToken;
    KDX: TToken;
    ABC: TToken;
    XYZ: TToken;
  };
  development: {
    KDA: TToken;
    KDX: TToken;
    ABC: TToken;
    XYZ: TToken;
  };
  mainnet: TMainnet;
};

export type TMainnet = {
  KDA: TToken;
  KDX: TToken;
  FLUX: TToken;
  HYPE: TToken;
  MOK: TToken;
  kwUSDC: TToken;
  KDL: TToken;
  KDS: TToken;
  BKA: TToken;
  KISHK: TToken;
  KAPY: TToken;
  JDE: TToken;
  kwBTC: TToken;
  USD2: TToken;
  ARKD: TToken;
  KAYC: TToken;
  CRNA: TToken;
};
export type TToken = {
  name: string;
  coingeckoId: string;
  tokenNameKaddexStats: string;
  code: string;
  icon: string;
  statsID: string;
  precision: number;
};
