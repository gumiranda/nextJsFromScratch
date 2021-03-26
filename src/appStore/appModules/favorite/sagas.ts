import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '@/services/api';
import { getSuccess } from './list';
import { favoriteFailure } from './actions';

export function* getFavorites({ payload }) {
  try {
    const { sort, query, field } = payload;
    let url = 'favorite?';

    if (sort) {
      url += `sort=${sort}&`;
    }
    if (query) {
      url += `query=${query}&`;
    }
    if (field) {
      url += `field=${field}&`;
    }

    const response = yield call(api.get, url);
    if (response.data) {
      const { favorites } = response.data;
      yield put(
        getSuccess({
          favoritesList: favorites,
        }),
      );
    } else {
      yield put(favoriteFailure());
    }
  } catch (err) {
    alert('Erro', 'Confira seus dados');
    yield put(favoriteFailure());
  }
}

export function* insertFavorite({ payload }) {
  try {
    const response = yield call(api.post, 'favorite', payload);
  } catch (e) {
    alert('Erro', JSON.stringify(e));
    yield put(favoriteFailure());
  }
}
export default all([
  takeLatest('@favorite/FAVORITE_REQUEST', insertFavorite),
  takeLatest('@favorite/LIST_REQUEST', getFavorites),
]);
