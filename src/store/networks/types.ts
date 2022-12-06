import {TNetwork} from '../../screens/Networks/components/Item/types';
import {TDefaultRequestState} from '../types';

export type NodeHash = {
  hash: string;
  height: number;
};

export type TNetworkDetail = {
  hashes: NodeHash[];
  height: number;
  weight: number;
  chainIds: string[];
  origin: string | null;
  instance: string;
  version: string;
  network: string;
} & TNetwork;

export type TNetworksState = {
  networksList: TNetwork[];
  selectedNetwork: TNetwork | null;
  activeNetwork: TNetwork | null;
  activeNetworkState: TDefaultRequestState<TNetworkDetail>;
};
