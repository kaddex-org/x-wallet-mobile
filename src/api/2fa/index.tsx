import UserService from '../firebase/users';

export const check2FA = async (publicKey: string) => {
  return await UserService.checkUser(publicKey);
};

export const verify2FA = async (publicKey: string, secret: string) => {
  return await UserService.verifySecretCode({
    isDeleted: false,
    publicKey,
    secret,
  });
};

export const deactivate2FA = async (publicKey: string) => {
  return await UserService.deactivate(publicKey);
};

export const generate2FA = async (publicKey: string) => {
  return await UserService.generate2faQrCode(publicKey);
};
