import {
  checkValidSeedPhrase,
  getKeyPairsFromSeedPhrase,
} from '../../utils/kadenaHelpers';
import UserService from '../firebase/users';

interface ValidateSeedsParams {
  seeds: string;
}

export const validateSeeds: (
  params: ValidateSeedsParams,
) => Promise<boolean> = async ({seeds}) => {
  if (seeds) {
    const isValidSeeds = checkValidSeedPhrase(seeds);
    if (isValidSeeds) {
      const {publicKey} = getKeyPairsFromSeedPhrase(seeds, 0);
      const isDeleted = await UserService.checkUserDeleted(publicKey);
      return !isDeleted;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
