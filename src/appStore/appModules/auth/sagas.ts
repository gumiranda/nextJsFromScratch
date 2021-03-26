/* eslint-disable no-underscore-dangle */
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '@/services/api';
import Router from 'next/router';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, '/api/login', {
      email,
      password,
    });
    console.log(response);
    const user = response.data;
    yield put(signInSuccess(user));
    Router.push('/');
  } catch (e) {
    console.log(e);
    alert('Error in signin');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, '/api/register', {
      email,
      password,
    });
    if (response?.data?._id) {
      yield put(signInSuccess(response?.data));
      Router.push('/');
    } else {
      if (response?.data?.message) {
        alert(response?.data?.message);
      }
      yield put(signFailure());
    }
  } catch (e) {
    console.log(e);
    alert('Error in signup');

    yield put(signFailure());
  }
}
export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
