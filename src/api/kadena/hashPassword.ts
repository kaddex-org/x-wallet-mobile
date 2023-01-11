import BcryptReactNative from 'bcrypt-react-native';

interface HashPasswordParams {
  password: string;
}

export const hashPassword: (
  params: HashPasswordParams,
) => Promise<string> = async ({password}) => {
  if (!password) {
    throw new Error('Wrong Parameters: request getGas');
  } else {
    const salt = await BcryptReactNative.getSalt(10);
    return await BcryptReactNative.hash(salt, password);
  }
};
