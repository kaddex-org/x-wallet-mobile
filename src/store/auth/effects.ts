import {takeLatest, put, select, call} from 'redux-saga/effects';
import {DELETE_ACCOUNT, GET_GENERATE_PASSWORDS, LOGOUT} from './actions';
import {
  setGeneratedPhrasesError,
  setGeneratedPhrasesLoading,
  setGeneratedPhrasesSuccess,
  setInitialAuthState,
  signOut,
} from './index';
import {setInitialContactState} from '../contacts';
import {setInitialHistoryState} from '../history';
import {setInitialNetworkState} from '../networks';
import {setInitialUserWalletState} from '../userWallet';
import {setInitialTransferState} from '../transfer';
import {makeSelectSelectedAccount} from '../userWallet/selectors';
import {makeSelectActiveNetworkDetails} from '../networks/selectors';
import {getNetworkParams} from '../../utils/networkHelpers';
import {generatePasswords} from '../../api/kadena/generatePasswords';
import {deleteAccount} from '../../api/kadena/deleteAccount';
import {removeAllPersistData} from '../../utils/storageHelplers';

function* getGeneratePassword() {
  yield put(setGeneratedPhrasesLoading(true));
  try {
    const data = yield call(generatePasswords);
    yield put(setGeneratedPhrasesSuccess(data));
  } catch (e) {
    yield put(setGeneratedPhrasesError(e));
  } finally {
    yield put(setGeneratedPhrasesLoading(false));
  }
}

function* logout() {
  yield put(signOut());
}

function* deleteAccountSaga() {
  try {
    const selectedAccount = yield select(makeSelectSelectedAccount);
    const activeNetwork = yield select(makeSelectActiveNetworkDetails);
    yield deleteAccount({
      ...selectedAccount,
      ...activeNetwork,
      ...getNetworkParams(activeNetwork),
    });
  } catch (e) {
  } finally {
    yield put(setInitialAuthState());
    yield put(setInitialContactState());
    yield put(setInitialHistoryState());
    yield put(setInitialNetworkState());
    yield put(setInitialTransferState());
    yield put(setInitialUserWalletState());
    yield removeAllPersistData();
  }
}

export function* authSaga() {
  yield takeLatest(GET_GENERATE_PASSWORDS, getGeneratePassword);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(DELETE_ACCOUNT, deleteAccountSaga);
}
