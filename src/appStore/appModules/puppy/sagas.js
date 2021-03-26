import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '@/services/externalapi2';
import { getSuccess } from './list';
import { puppyFailure } from './actions';

export function* getPuppys({ payload }) {
  try {
    const { query, field } = payload;
    let url = '?';

    if (query && field) {
      if (field.includes('ingredients')) {
        url += `i=${query}&`;
      }
      if (field.includes('title')) {
        url += `q=${query}&`;
      } else {
        url += 'q=chicken&';
      }
    }

    const response = yield call(api.get, url);
    if (response.data) {
      yield put(
        getSuccess({
          puppysList: response.data,
        }),
      );
    } else {
      yield put(puppyFailure());
    }
  } catch (err) {
    alert('Erro', 'Confira seus dados');
    yield put(puppyFailure());
  }
}

export default all([takeLatest('@puppy/LIST_REQUEST', getPuppys)]);
