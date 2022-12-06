import {takeLatest, put, call, select} from 'redux-saga/effects';
import queryString from 'query-string';
import api from '../../api';
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

function* getGeneratePassword() {
  yield put(setGeneratedPhrasesLoading(true));
  try {
    const {data} = yield call(api.get, '/api/generate-passwords');
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

function* deleteAccount() {
  try {
    const selectedAccount = yield select(makeSelectSelectedAccount);
    const activeNetwork = yield select(makeSelectActiveNetworkDetails);
    yield call(
      api.get,
      `/api/delete-account?${queryString.stringify({
        ...selectedAccount,
        ...activeNetwork,
        ...getNetworkParams(activeNetwork),
      })}`,
    );
  } catch (e) {
  } finally {
    yield put(setInitialAuthState());
    yield put(setInitialContactState());
    yield put(setInitialHistoryState());
    yield put(setInitialNetworkState());
    yield put(setInitialTransferState());
    yield put(setInitialUserWalletState());
  }
}

export function* authSaga() {
  yield takeLatest(GET_GENERATE_PASSWORDS, getGeneratePassword);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(DELETE_ACCOUNT, deleteAccount);
}
