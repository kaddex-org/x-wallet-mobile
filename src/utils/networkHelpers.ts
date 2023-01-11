import {EDefaultNetwork} from '../screens/Networks/types';
import {TNetworkDetail} from '../store/networks/types';
import {TNetworkParams} from '../store/types';

export const getNetwork = (network: string): any => {
  switch (network) {
    case EDefaultNetwork.mainnet:
      return 'mainnet';
    case EDefaultNetwork.testnet:
      return 'testnet';
    case EDefaultNetwork.devnet:
      return 'devnet';
    default:
      return 'custom';
  }
};

export const getNetworkParams = (
  networkDetail: TNetworkDetail,
): TNetworkParams => {
  const network = getNetwork(networkDetail?.network as string);
  return {
    network,
    customHost: network === 'custom' ? networkDetail?.host : undefined,
  };
};
