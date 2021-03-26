import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import api from '@/services/api';
import { updateFavoritesSuccess, updateFavoritesFailure } from './actions';
import { getSuccess, getFailure } from './list';

export function* getSession() {
  try {
    const response = yield call(api.get, 'favorites/session');
    if (response?.data?.favorites) {
      console.log('FAVORITES ATUALIZADO', response?.data?.favorites?.cardId);
      yield put(updateFavoritesSuccess(response.data.favorites));
    }
  } catch (e) {
    console.log(e);
    yield put(updateFavoritesFailure());
  }
}
export function* updateFavorites({ payload }) {
  try {
    const { name, _id, email, oldPassword, password, passwordConfirmation } = payload.data;
    const favorites = {
      name,
      _id,
      email,
      oldPassword,
      password,
      passwordConfirmation,
    };

    const response = yield call(api.put, `favorites/${favorites._id}`, favorites);
    if (response.data.message) {
      alert('Erro', 'Confira seus dados');

      yield put(updateFavoritesFailure());
    } else if (response.data) {
      yield put(updateFavoritesSuccess(response.data));
    } else {
      alert('Erro', 'Confira seus dados');
      yield put(updateFavoritesFailure());
    }
  } catch (err) {
    console.tron.log(err);
    alert('Erro', 'Confira seus dados');
    yield put(updateFavoritesFailure());
  }
}
export function* completeFavorites({ payload }) {
  try {
    let newCpf;
    if (payload?.data?.cpf) {
      newCpf =
        payload?.data?.cpf?.length < 15
          ? payload?.data?.cpf.replace('.', '').replace('.', '').replace('-', '')
          : payload?.data?.cpf.replace('.', '').replace('.', '').replace('.', '').replace('/', '').replace('-', '');
    }
    const response = yield call(
      api.put,
      'favorites/completeRegister',
      payload?.data?.cardId
        ? { cardId: payload?.data?.cardId }
        : payload?.data?.cpf && newCpf
        ? {
            ...payload.data,
            cpf: newCpf,
          }
        : payload.data,
    );
    if (response.data) {
      yield put(updateFavoritesSuccess(response.data));
    } else {
      alert('Erro', 'Confira seus dados');
      yield put(updateFavoritesFailure());
    }
  } catch (err) {
    console.log(err);
    alert('Erro', 'Confira seus dados');
    yield put(updateFavoritesFailure());
  }
}
export function* getFavoritess({ payload }) {
  try {
    const { nextPage, page } = payload;
    const response = yield call(api.get, `favorites/page/${page}`);
    if (response.data) {
      const { favoritessCount, favoritess } = response.data;
      if (!nextPage) {
        yield put(getSuccess({ favoritessList: favoritess, favoritessTotal: favoritessCount }));
      } else {
        const { favoritessList } = yield select((state) => state.favorites);
        yield put(
          getSuccess({
            favoritessList: [...favoritessList, ...favoritess],
            favoritessTotal: favoritessCount,
          }),
        );
      }
    } else {
      yield put(getFailure());
    }
  } catch (err) {
    alert('Erro', 'Confira seus dados');
    yield put(getFailure());
  }
}

export default all([
  takeLatest('@favorites/UPDATE_FAVORITES_REQUEST', updateFavorites),
  takeLatest('@favorites/LIST_REQUEST', getFavoritess),
  takeLatest('@favorites/GET_SESSION', getSession),
  takeLatest('@favorites/COMPLETE_FAVORITES_REQUEST', completeFavorites),
]);
