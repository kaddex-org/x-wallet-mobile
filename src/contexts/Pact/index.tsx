import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {MMKV} from 'react-native-mmkv';
import {useSelector} from 'react-redux';
import {makeSelectSelectedAccount} from '../../store/userWallet/selectors';

import {
  TGasConfig,
  TGetReservesProps,
  TPactContext,
  TPairReserve,
} from './types';
import {GAS_OPTIONS} from '../../constants';
import axios from 'axios';
import {KADDEX_API_URL, KADDEX_NAMESPACE} from '../../api/constants';
import {getPact} from '../../api/kadena/pact';

export const FEE = 0.003;

export const PactContext = createContext({} as TPactContext);

const initialNetworkGasData = {
  highestGasPrice: 0,
  networkCongested: false,
  suggestedGasPrice: 0,
  lowestGasPrice: 0,
};

const storage = new MMKV({id: 'pact-storage'});

export const PactProvider: FC = ({children}) => {
  const selectedAccount = useSelector(makeSelectSelectedAccount);
  const [pairReserve, setPairReserve] = useState<TPairReserve>({
    token0: '',
    token1: '',
  });
  const [slippage, setSlippage] = useState(
    storage.getNumber('slippage') || 0.05,
  );
  const [ttl, setTtl] = useState(storage.getNumber('ttl') || 600);
  const [ratio, setRatio] = useState(NaN);
  const [enableGasStation, setEnableGasStation] = useState(true);
  const [gasConfiguration, setGasConfiguration] = useState<TGasConfig>(
    GAS_OPTIONS.DEFAULT.SWAP,
  );
  const [networkGasData, setNetworkGasData] = useState(initialNetworkGasData);

  useEffect(() => {
    getNetworkGasData();
    if (!selectedAccount?.wallets || selectedAccount?.wallets.length === 0) {
      setTtl(600);
    }
  }, [selectedAccount?.wallets]);

  useEffect(() => {
    storage.set('ttl', ttl);
  }, [ttl]);

  useEffect(() => {
    storage.set('slippage', slippage);
  }, [slippage]);

  useEffect(() => {
    pairReserve
      ? setRatio(+pairReserve.token0 / +pairReserve.token1)
      : setRatio(NaN);
  }, [pairReserve]);

  const getNetworkGasData = useCallback(async () => {
    try {
      let response = await axios.get(
        `${KADDEX_API_URL}/api/mempool/getgasdata`,
        {
          params: {
            chain: '2',
          },
        },
      );
      setNetworkGasData(response.data);
    } catch (err) {}
  }, []);

  const getReserves = useCallback(async (props: TGetReservesProps) => {
    try {
      const {params} = props;
      const data = await getPact({
        ...params,
        pactCode: `(use ${KADDEX_NAMESPACE}.exchange) (let* ((p (get-pair ${props.token0Address} ${props.token1Address}))(reserveA (reserve-for p ${props.token0Address}))(reserveB (reserve-for p ${props.token1Address})))[reserveA reserveB])`,
      });
      if (data.length !== 0) {
        setPairReserve({
          token0:
            typeof data[0] === 'number'
              ? data[0]
              : typeof data[0] !== 'string'
              ? data[0].decimal
              : data[0],
          token1:
            typeof data[1] === 'number'
              ? data[1]
              : typeof data[1] !== 'string'
              ? data[1].decimal
              : data[1],
        });
      } else {
        setPairReserve({
          token0: '',
          token1: '',
        });
      }
    } catch (e) {
      setPairReserve({
        token0: '',
        token1: '',
      });
    }
  }, []);

  const handleGasConfiguration = useCallback((key: string, value: string) => {
    setGasConfiguration(prev => ({...prev, [key]: value}));
  }, []);

  const realizedLPFee = useCallback((numHops = 1) => {
    return 1 - (1 - Number(FEE)) * numHops;
  }, []);

  const priceImpactWithoutFee = useCallback(
    (priceImpact: string) => {
      return Number(priceImpact) - realizedLPFee();
    },
    [realizedLPFee],
  );

  const computeOut = useCallback(
    function (amountIn: string): number {
      const amount = Number(amountIn);
      let reserveOut = Number(pairReserve.token1);
      let reserveIn = Number(pairReserve.token0);
      let numerator = Number(amount * (1 - Number(FEE)) * reserveOut);
      let denominator = Number(reserveIn + amount * (1 - Number(FEE)));
      return numerator / denominator;
    },
    [pairReserve],
  );

  const computeIn = useCallback(
    function (amountOut: string) {
      const amount = Number(amountOut);
      let reserveOut = Number(pairReserve.token1);
      let reserveIn = Number(pairReserve.token0);
      let numerator = Number(reserveIn * amount);
      let denominator = Number((reserveOut - amount) * (1 - Number(FEE)));
      return numerator / denominator;
    },
    [pairReserve],
  );

  const computePriceImpact = useCallback(
    (amountIn: string, amountOut: string) => {
      const reserveOut = Number(pairReserve.token1);
      const reserveIn = Number(pairReserve.token0);
      const midPrice = reserveOut / reserveIn;
      const exactQuote = Number(amountIn) * midPrice;
      const slippage = (exactQuote - Number(amountOut)) / exactQuote;
      return slippage;
    },
    [pairReserve],
  );

  return (
    <PactContext.Provider
      value={{
        slippage,
        ratio,
        pairReserve,
        enableGasStation,
        setEnableGasStation,
        gasConfiguration,
        setGasConfiguration,
        computeOut,
        getReserves,
        computeIn,
        priceImpactWithoutFee,
        computePriceImpact,
        networkGasData,
        setNetworkGasData,
        handleGasConfiguration,
        ttl,
        setTtl,
        setSlippage,
      }}>
      {children}
    </PactContext.Provider>
  );
};
