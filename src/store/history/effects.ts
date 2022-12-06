import {call, put, takeEvery, all} from 'redux-saga/effects';
import queryString from 'query-string';
import {AxiosResponse} from 'axios';
import {TAction} from '../types';
import {TPollRequestParams, TPollResp} from './types';
import {GET_POLL_REQUEST} from './actions';
import {setGetPollError, setGetPollLoading, setGetPollSuccess} from './index';
import api from '../../api';

function* getPollRequest({payload}: TAction<TPollRequestParams[]>) {
  yield put(setGetPollLoading(true));
  try {
    const promises = payload.map(item =>
      call(api.get, `/api/poll?${queryString.stringify(item)}`),
    );
    const responses = yield all(promises);
    const responseData = responses.map(
      ({data}: AxiosResponse<TPollResp>) => data,
    );
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
