import BcryptReactNative from 'bcrypt-react-native';

interface ComparePasswordParams {
  password: string;
  hash: string;
}

export const comparePassword: (
  params: ComparePasswordParams,
) => Promise<boolean> = async ({password, hash}) => {
  if (!password || !hash) {
    throw new Error('Wrong Parameters: request getGas');
  } else {
    const isSame = await BcryptReactNative.compareSync(password, hash);
    return !!isSame;
  }
};
