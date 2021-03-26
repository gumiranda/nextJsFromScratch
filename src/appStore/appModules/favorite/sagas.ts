import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '@/services/api';
import { getSuccess } from './list';
import { favoriteFailure, favoriteSuccess } from './actions';

export function* getFavorites({ payload }) {
  try {
    const { sort, query, field, userId } = payload;
    let url = 'favorites?';

    if (sort) {
      url += `sort=${sort}&`;
    }
    if (query) {
      url += `query=${query}&`;
    }
    if (field) {
      url += `field=${field}&`;
    }
    if (userId) {
      url += `userId=${userId}&`;
    }

    const response = yield call(api.get, url);
    if (response?.data?.favorites) {
      yield put(
        getSuccess({
          favoritesList: response?.data?.favorites,
          favoritesTotal: response?.data?.favorites?.length,
        }),
      );
    } else {
      yield put(favoriteFailure());
    }
  } catch (err) {
    alert('Erro ao obter os favoritos');
    yield put(favoriteFailure());
  }
}

export function* insertFavorite({ payload }) {
  try {
    const response = yield call(api.post, 'favorites', payload);
    if (response?.data?.favorites) {
      yield put(favoriteSuccess());
      yield put(
        getSuccess({
          favoritesList: response?.data?.favorites,
          favoritesTotal: response?.data?.favorites?.length,
        }),
      );
    } else {
      yield put(favoriteFailure());
    }
  } catch (e) {
    //    alert('Error to insert the favorite');
    alert('Error to insert the favorite');
    yield put(favoriteFailure());
  }
}
export default all([
  takeLatest('@favorite/FAVORITE_REQUEST', insertFavorite),
  takeLatest('@favorite/LIST_REQUEST', getFavorites),
]);
