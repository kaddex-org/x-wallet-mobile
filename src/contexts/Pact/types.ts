import {Dispatch, SetStateAction} from 'react';

export type TPactContext = {
  getReserves: (props: TGetReservesProps) => void;
  pairReserve: TPairReserve;
  priceImpactWithoutFee: (pairImpact: string) => number;
  computePriceImpact: (amountIn: string, amountOut: string) => number;
  ratio: number;
  slippage: number;
  computeOut: (amount: string) => number;
  computeIn: (amount: string) => number;
  enableGasStation: boolean;
  setEnableGasStation: Dispatch<SetStateAction<boolean>>;
  gasConfiguration: TGasConfig;
  setGasConfiguration: Dispatch<SetStateAction<TGasConfig>>;
  networkGasData: TNetworkGasData;
  setNetworkGasData: Dispatch<SetStateAction<TNetworkGasData>>;
  handleGasConfiguration: (key: string, value: string) => void;
  ttl: number;
  setTtl: Dispatch<SetStateAction<number>>;
  setSlippage: Dispatch<SetStateAction<number>>;
};

export type TGasConfig = {
  gasLimit: number;
  gasPrice: number;
};

export type TGetReservesProps = {
  token0Address: string;
  token1Address: string;
  params: {
    customHost: string;
    network: string;
    chainId: number | string;
    instance: string;
    version: string;
  };
};

export type TNetworkGasData = {
  highestGasPrice: number;
  networkCongested: boolean;
  suggestedGasPrice: number;
  lowestGasPrice: number;
};

export type TPairReserve = {
  token0: string;
  token1: string;
};

export type TReserveResponse = {decimal: string} | string;
