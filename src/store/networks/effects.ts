import {call, put, takeLatest} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';

import {GET_NETWORK_DETAILS_REQUEST} from './actions';
import {
  setNetworkDetailsError,
  setNetworkDetailsLoading,
  setNetworkDetailsSuccess,
} from './index';
import {TNetwork} from '../../screens/Networks/components/Item/types';
import {TAction} from '../types';
import {TNetworkDetail} from './types';

function* getNetworkDetailsRequest({payload}: TAction<TNetwork>) {
  yield put(setNetworkDetailsLoading(true));
  try {
    const {
      data: {nodeApiVersion, nodeVersion, nodeChains},
    }: AxiosResponse = yield call(axios.get, `${payload.host}/info`);
    const {data}: AxiosResponse = yield call(
      axios.get,
      `${payload.host}/chainweb/${nodeApiVersion}/${nodeVersion}/cut`,
    );
    const resp: TNetworkDetail = {
      ...payload,
      ...data,
      instance: nodeVersion,
      version: nodeApiVersion,
      chainIds: nodeChains,
    };
    yield put(setNetworkDetailsSuccess(resp));
  } catch (err) {
    yield put(setNetworkDetailsError(err));
  } finally {
    yield put(setNetworkDetailsLoading(false));
  }
}

export function* networksSaga() {
  yield takeLatest(GET_NETWORK_DETAILS_REQUEST, getNetworkDetailsRequest);
}
