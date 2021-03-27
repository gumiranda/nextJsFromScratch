import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '@/services/externalapi1';
import { getSuccess } from './list';
import { breweryFailure } from './actions';

export function* getBrewerys({ payload }) {
  try {
    const { sort, query, field, typeSort } = payload;
    let url = 'breweries?';
    const type = typeSort?.includes('asc') ? '-' : '+';
    if (sort) {
      url += `sort=${type}${sort}&`;
    }
    if (query && field) {
      url += `by_${field}=${query}&`;
    }

    const response = yield call(api.get, url);
    if (response.data) {
      yield put(
        getSuccess({
          brewerysList: response.data,
        }),
      );
    } else {
      yield put(breweryFailure());
    }
  } catch (err) {
    console.log(err);

    alert(JSON.stringify(err));
    yield put(breweryFailure());
  }
}

export default all([takeLatest('@brewery/LIST_REQUEST', getBrewerys)]);
