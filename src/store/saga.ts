import {all} from 'redux-saga/effects';

import {authSaga} from './auth/effects';
import {networksSaga} from './networks/effects';
import {userWalletSaga} from './userWallet/effects';
import {transfersSaga} from './transfer/effects';
import {historySaga} from './history/effects';

export default function* rootSaga() {
  yield all([
    authSaga(),
    networksSaga(),
    userWalletSaga(),
    transfersSaga(),
    historySaga(),
  ]);
}
