import {Platform} from 'react-native';

export const isIos = Platform.OS === 'ios';

export const GAS_PRICE = 0.000001;
export const GAS_LIMIT = 2500;

export const ECONOMY_GAS_PRICE = 0.00000001;
export const FAST_GAS_PRICE = 0.0001;

export const REQUIRED_MESSAGE = 'required';

const GAS_STATION_PRICE = 0.0000001;
const NORMAL_GAS_PRICE = 0.000001;

const SWAP_GAS = 10000;
const ADD_LIQUIDITY_DOUBLE_SIDE_GAS = 20000;
const ADD_LIQUIDITY_SINGLE_SIDE_GAS = 20000;
const REMOVE_LIQUIDITY_GAS = 40000;
const CLAIM_LIQUIDITY_REWARDS_GAS = 40000;
const DAO_VOTE_GAS = 2000;
const STAKE_GAS = 10000;
const UNSTAKE_GAS = 10000;

export const GAS_OPTIONS = {
  low: {
    SWAP: {
      gasLimit: SWAP_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
    ADD_LIQUIDITY_DOUBLE_SIDE: {
      gasLimit: ADD_LIQUIDITY_DOUBLE_SIDE_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
    ADD_LIQUIDITY_SINGLE_SIDE: {
      gasLimit: ADD_LIQUIDITY_SINGLE_SIDE_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
    REMOVE_LIQUIDITY: {
      gasLimit: REMOVE_LIQUIDITY_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
    CLAIM_LIQUIDITY_REWARDS: {
      gasLimit: CLAIM_LIQUIDITY_REWARDS_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
    DAO_VOTE: {
      gasLimit: DAO_VOTE_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
    STAKE: {
      gasLimit: STAKE_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
    UNSTAKE: {
      gasLimit: UNSTAKE_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
  },
  normal: {
    SWAP: {
      gasLimit: SWAP_GAS,
      gasPrice: NORMAL_GAS_PRICE,
    },
    ADD_LIQUIDITY_DOUBLE_SIDE: {
      gasLimit: ADD_LIQUIDITY_DOUBLE_SIDE_GAS,
      gasPrice: NORMAL_GAS_PRICE,
    },
    ADD_LIQUIDITY_SINGLE_SIDE: {
      gasLimit: ADD_LIQUIDITY_SINGLE_SIDE_GAS,
      gasPrice: NORMAL_GAS_PRICE,
    },
    REMOVE_LIQUIDITY: {
      gasLimit: REMOVE_LIQUIDITY_GAS,
      gasPrice: NORMAL_GAS_PRICE,
    },
    CLAIM_LIQUIDITY_REWARDS: {
      gasLimit: CLAIM_LIQUIDITY_REWARDS_GAS,
      gasPrice: NORMAL_GAS_PRICE,
    },
    DAO_VOTE: {
      gasLimit: DAO_VOTE_GAS,
      gasPrice: NORMAL_GAS_PRICE,
    },
    STAKE: {
      gasLimit: STAKE_GAS,
      gasPrice: NORMAL_GAS_PRICE,
    },
    UNSTAKE: {
      gasLimit: UNSTAKE_GAS,
      gasPrice: NORMAL_GAS_PRICE,
    },
  },
  fast: {
    SWAP: {
      gasLimit: SWAP_GAS,
      gasPrice: FAST_GAS_PRICE,
    },
    ADD_LIQUIDITY_DOUBLE_SIDE: {
      gasLimit: ADD_LIQUIDITY_DOUBLE_SIDE_GAS,
      gasPrice: FAST_GAS_PRICE,
    },
    ADD_LIQUIDITY_SINGLE_SIDE: {
      gasLimit: ADD_LIQUIDITY_SINGLE_SIDE_GAS,
      gasPrice: FAST_GAS_PRICE,
    },
    REMOVE_LIQUIDITY: {
      gasLimit: REMOVE_LIQUIDITY_GAS,
      gasPrice: FAST_GAS_PRICE,
    },
    CLAIM_LIQUIDITY_REWARDS: {
      gasLimit: CLAIM_LIQUIDITY_REWARDS_GAS,
      gasPrice: FAST_GAS_PRICE,
    },
    DAO_VOTE: {
      gasLimit: DAO_VOTE_GAS,
      gasPrice: FAST_GAS_PRICE,
    },
    STAKE: {
      gasLimit: STAKE_GAS,
      gasPrice: FAST_GAS_PRICE,
    },
    UNSTAKE: {
      gasLimit: UNSTAKE_GAS,
      gasPrice: FAST_GAS_PRICE,
    },
  },
  DEFAULT: {
    SWAP: {
      gasLimit: SWAP_GAS,
      gasPrice: ECONOMY_GAS_PRICE,
    },
    ADD_LIQUIDITY_DOUBLE_SIDE: {
      gasLimit: ADD_LIQUIDITY_DOUBLE_SIDE_GAS,
      gasPrice: GAS_STATION_PRICE,
    },
    ADD_LIQUIDITY_SINGLE_SIDE: {
      gasLimit: ADD_LIQUIDITY_SINGLE_SIDE_GAS,
      gasPrice: GAS_STATION_PRICE,
    },
    REMOVE_LIQUIDITY: {
      gasLimit: REMOVE_LIQUIDITY_GAS,
      gasPrice: GAS_STATION_PRICE,
    },
    CLAIM_LIQUIDITY_REWARDS: {
      gasLimit: CLAIM_LIQUIDITY_REWARDS_GAS,
      gasPrice: GAS_STATION_PRICE,
    },
    DAO_VOTE: {
      gasLimit: DAO_VOTE_GAS,
      gasPrice: GAS_STATION_PRICE,
    },
    STAKE: {
      gasLimit: STAKE_GAS,
      gasPrice: GAS_STATION_PRICE,
    },
    UNSTAKE: {
      gasLimit: UNSTAKE_GAS,
      gasPrice: GAS_STATION_PRICE,
    },
  },
};
