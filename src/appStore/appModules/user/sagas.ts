import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import api from '@/services/api';
import {updateUserSuccess, updateUserFailure} from './actions';
import {getSuccess, getFailure} from './list';

export function* getSession() {
  try {
    const response = yield call(api.get, 'user/session');
    if (response?.data?.user) {
      console.log('USER ATUALIZADO', response?.data?.user?.cardId);
      yield put(updateUserSuccess(response.data.user));
    }
  } catch (e) {
    console.log(e);
    yield put(updateUserFailure());
  }
}
export function* updateUser({payload}) {
  try {
    const {
      name,
      _id,
      email,
      oldPassword,
      password,
      passwordConfirmation,
    } = payload.data;
    const user = {
      name,
      _id,
      email,
      oldPassword,
      password,
      passwordConfirmation,
    };

    const response = yield call(api.put, `user/${user._id}`, user);
    if (response.data.message) {
      alert('Erro', 'Confira seus dados');

      yield put(updateUserFailure());
    } else if (response.data) {
      yield put(updateUserSuccess(response.data));
    } else {
      alert('Erro', 'Confira seus dados');
      yield put(updateUserFailure());
    }
  } catch (err) {
    console.tron.log(err);
    alert('Erro', 'Confira seus dados');
    yield put(updateUserFailure());
  }
}
export function* completeUser({payload}) {
  try {
    let newCpf;
    if (payload?.data?.cpf) {
      newCpf =
        payload?.data?.cpf?.length < 15
          ? payload?.data?.cpf
              .replace('.', '')
              .replace('.', '')
              .replace('-', '')
          : payload?.data?.cpf
              .replace('.', '')
              .replace('.', '')
              .replace('.', '')
              .replace('/', '')
              .replace('-', '');
    }
    const response = yield call(
      api.put,
      'user/completeRegister',
      payload?.data?.cardId
        ? {cardId: payload?.data?.cardId}
        : payload?.data?.cpf && newCpf
        ? {
            ...payload.data,
            cpf: newCpf,
          }
        : payload.data,
    );
    if (response.data) {
      yield put(updateUserSuccess(response.data));
    } else {
      alert('Erro', 'Confira seus dados');
      yield put(updateUserFailure());
    }
  } catch (err) {
    console.log(err);
    alert('Erro', 'Confira seus dados');
    yield put(updateUserFailure());
  }
}
export function* getUsers({payload}) {
  try {
    const {nextPage, page} = payload;
    const response = yield call(api.get, `user/page/${page}`);
    if (response.data) {
      const {usersCount, users} = response.data;
      if (!nextPage) {
        yield put(getSuccess({usersList: users, usersTotal: usersCount}));
      } else {
        const {usersList} = yield select((state) => state.user);
        yield put(
          getSuccess({
            usersList: [...usersList, ...users],
            usersTotal: usersCount,
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
  takeLatest('@user/UPDATE_USER_REQUEST', updateUser),
  takeLatest('@user/LIST_REQUEST', getUsers),
  takeLatest('@user/GET_SESSION', getSession),
  takeLatest('@user/COMPLETE_USER_REQUEST', completeUser),
]);
