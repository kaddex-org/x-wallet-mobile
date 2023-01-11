import {put, takeEvery, all} from 'redux-saga/effects';
import {TAction} from '../types';
import {TPollRequestParams} from './types';
import {GET_POLL_REQUEST} from './actions';
import {setGetPollError, setGetPollLoading, setGetPollSuccess} from './index';
import {getPoll} from '../../api/kadena/poll';

function* getPollRequest({payload}: TAction<TPollRequestParams[]>) {
  yield put(setGetPollLoading(true));
  try {
    const promises = payload.map((item: any) => {
      return getPoll(item);
    });
    const responses = yield all(promises);
    const responseData = responses.map((data: any) => data);
    yield put(setGetPollSuccess(responseData));
  } catch (e) {
    yield put(setGetPollError(e));
  } finally {
    yield put(setGetPollLoading(false));
  }
}

export function* historySaga() {
  yield takeEvery(GET_POLL_REQUEST, getPollRequest);
}
