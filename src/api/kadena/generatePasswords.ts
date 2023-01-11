import {
  generateSeedPhrase,
  getKeyPairsFromSeedPhrase,
} from '../../utils/kadenaHelpers';
import UserService from '../firebase/users';

export const generatePasswords: () => Promise<string[]> = async () => {
  const seeds = generateSeedPhrase();
  const {publicKey} = getKeyPairsFromSeedPhrase(seeds, 0);
  let candidate: any;
  try {
    candidate = await UserService.getUserByPublicKey(publicKey);
    if (!candidate) {
      await UserService.addUser({
        isDeleted: false,
        secret: '',
        is2FaAdded: false,
        publicKey,
      });
    }
  } catch (e) {}
  return seeds.split(' ');
};
