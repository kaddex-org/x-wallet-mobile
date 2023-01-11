import {authenticator} from 'otplib';
import firestore from '@react-native-firebase/firestore';

type TUser = {
  secret: string;
  isDeleted: boolean;
  publicKey: string;
  is2FaAdded: boolean;
};

type TAddUserProps = {
  secret: string;
  isDeleted: boolean;
  publicKey: string;
  is2FaAdded: boolean;
};

const usersRef = firestore().collection('users');

class Users {
  async generate2faQrCode(publicKey: string) {
    let candidate = await this.getUserByPublicKey(publicKey);
    if (!candidate) {
      candidate = await this.addUser({
        secret: '',
        isDeleted: false,
        is2FaAdded: false,
        publicKey,
      });
    }

    const secret = !candidate.secret.length
      ? await authenticator.generateSecret()
      : candidate.secret;

    await usersRef.doc(candidate.id).update({secret});

    return {
      url: authenticator.keyuri(candidate.publicKey, 'Kaddex X-Wallet', secret),
      secret,
    };
  }

  async verifySecretCode(data: Omit<TUser, 'is2FaAdded'>) {
    const user = await this.getUserByPublicKey(data.publicKey);

    if (user) {
      if (!authenticator.check(data.secret, user.secret)) {
        return 'code is incorrect';
      }
      await firestore()
        .collection('users')
        .doc(user.id)
        .update({is2FaAdded: true});
      return 'success';
    }
    return 'user is not found';
  }

  async getUserByPublicKey(publicKey: string): Promise<any> {
    const snapshot = await usersRef.where('publicKey', '==', publicKey).get();

    return snapshot.docs.map((item: any) => ({
      ...item.data(),
      id: item.id,
    }))[0];
  }

  async addUser(data: TAddUserProps) {
    const res = await usersRef.add(data);
    const user = await res.get();
    return {...user.data(), id: user.id};
  }

  async checkUser(publicKey: string) {
    const user = await this.getUserByPublicKey(publicKey);
    return !user ? false : user.is2FaAdded;
  }

  async checkUserDeleted(publicKey: string) {
    const user = await this.getUserByPublicKey(publicKey);
    return !user ? false : user.isDeleted;
  }

  async deactivate(publicKey: string): Promise<'success' | 'fail'> {
    try {
      const user = await this.getUserByPublicKey(publicKey);
      if (!user) {
        return 'fail';
      }

      await firestore()
        .collection('users')
        .doc(user.id)
        .update({is2FaAdded: false});
      return 'success';
    } catch (e) {
      return 'fail';
    }
  }

  async deleteUser(publicKey: string): Promise<'success' | 'fail'> {
    try {
      const user = await this.getUserByPublicKey(publicKey);
      if (!user) {
        return 'fail';
      }
      await firestore()
        .collection('users')
        .doc(user.id)
        .update({isDeleted: true});
      return 'success';
    } catch (e) {
      return 'fail';
    }
  }

  async getUsers(): Promise<any[]> {
    const users = await usersRef.get();

    return users.docs.map((user: any) => ({
      ...user.data(),
      id: user.id,
    }));
  }
}

export default new Users();
