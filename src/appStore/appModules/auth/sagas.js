import {takeLatest, call, put, all, select} from 'redux-saga/effects';
import api from '@/services/api';
import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;
    const passwordConfirmation = password;
    const response = yield call(api.post, 'user/authenticate', {
      email,
      password,
      passwordConfirmation,
    });
    const {token, user} = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
  } catch (e) {
    console.log(e);
    yield put(signFailure());
  }
}
export function* signInFB({payload}) {
  try {
    const {faceId, faceToken} = payload;
    const response = yield call(api.post, 'user/authenticateFacebook', {
      faceId,
      faceToken,
    });
    if (response?.data?.accessToken) {
      const {token, user} = response.data.accessToken;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      yield put(signInSuccess(token, user));
    } else {
      yield put(signFailure());
    }
  } catch (e) {
    console.log(e);
    yield put(signFailure());
  }
}
export function* signUp({payload}) {
  try {
    let coords;
    const {
      email,
      password,
      passwordConfirmation,
      type,
      name,
      uf,
      city,
      coord,
      zipCode,
      streetNumber,
      addresses,
      address,
    } = payload;
    const {pushId, pushToken} = yield select((state) => state.auth);

    if (type === 'admin') {
      yield put(signFailure());
    }
    if (!coord) {
      coords = [43.6589, -67.0087548];
    } else {
      coords = coord;
    }
    const response = yield call(api.post, 'user/register', {
      email,
      password,
      passwordConfirmation,
      role: type,
      name,
      coord: coords,
      uf,
      city,
      pushId,
      pushToken,
      zipCode,
      streetNumber,
      addresses,
      address,
    });
    if (response.status === 201) {
      const responseSign = yield call(api.post, 'user/authenticate', {
        email,
        password,
        passwordConfirmation,
      });
      const {token, user} = responseSign.data;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      yield put(signInSuccess(token, user));
    } else {
      yield put(signFailure());
    }
  } catch (e) {
    console.log(e);

    yield put(signFailure());
  }
}
export function signOut() {}
export function setToken({payload}) {
  if (!payload) return;
  if (payload.token === undefined) {
    if (payload.auth.token) {
      api.defaults.headers.Authorization = `Bearer ${payload.auth.token}`;
    }
  } else {
    const {token} = payload;
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_IN_FB_REQUEST', signInFB),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
