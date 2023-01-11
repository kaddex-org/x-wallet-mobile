import UserService from '../firebase/users';
import {DefaultQueryParams} from '../types';

interface AccountDeleteQueryParams extends DefaultQueryParams {
  accountName: string;
  publicKey: string;
  instance: string;
  version: string;
  chainId: string;
}

export const deleteAccount: (
  params: AccountDeleteQueryParams,
) => Promise<boolean> = async ({
  accountName,
  publicKey,
  network,
  instance,
  version,
  chainId,
}) => {
  if (
    !network ||
    !version ||
    !instance ||
    chainId === undefined ||
    !publicKey ||
    !accountName
  ) {
    throw new Error('Wrong Parameters: request deleteAccount');
  }
  try {
    const status = await UserService.deleteUser(publicKey);
    return status === 'success';
  } catch (e) {
    throw new Error('Failed to delete an account. Please try again later');
  }
};
