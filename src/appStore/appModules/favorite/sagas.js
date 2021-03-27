import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '@/services/api';
import { getSuccess } from './list';
import { favoriteFailure, favoriteSuccess } from './actions';

export function* getFavorites({ payload }) {
  try {
    const { sort, query, field, userId, typeSort } = payload;
    let url = 'favorites?';

    if (sort && typeSort) {
      url += `sort=${sort}&typeSort=${typeSort}`;
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
          favoritesOfUser: response?.data?.favoritesOfUser,
          favoritesTotal: response?.data?.favoritesTotal,
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
          favoritesOfUser: response?.data?.favoritesOfUser,
          favoritesTotal: response?.data?.favoritesTotal,
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

export function* removeFavorite({ payload }) {
  try {
    const { key, userId } = payload;
    const response = yield call(api.delete, `favorites?key=${encodeURI(key)}&userId=${encodeURI(userId)}`);
    if (response?.data?.favorites) {
      yield put(favoriteSuccess());
      yield put(
        getSuccess({
          favoritesList: response?.data?.favorites,
          favoritesOfUser: response?.data?.favoritesOfUser,
          favoritesTotal: response?.data?.favoritesTotal,
        }),
      );
    } else {
      yield put(favoriteFailure());
    }
  } catch (e) {
    alert('Error to remove the favorite');
    yield put(favoriteFailure());
  }
}
export default all([
  takeLatest('@favorite/FAVORITE_REQUEST', insertFavorite),
  takeLatest('@favorite/FAVORITE_REMOVE_REQUEST', removeFavorite),
  takeLatest('@favorite/LIST_REQUEST', getFavorites),
]);
