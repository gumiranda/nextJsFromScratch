/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '@/services/externalapi2';
import { getSuccess } from './list';
import { fipeFailure } from './actions';

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}
export function* getFipes({ payload }) {
  try {
    const { query, field, sort, typeSort } = payload;
    const url = '';

    const response = yield call(api.get, url);
    if (response.data) {
      const sorted = response.data.sort(compareValues(sort, typeSort));
      const filtered =
        query && field ? sorted?.filter((item) => item[field].toLowerCase().includes(query.toLowerCase())) : [];

      yield put(
        getSuccess({
          fipesList: query && field ? filtered : sorted,
        }),
      );
    } else {
      yield put(fipeFailure());
    }
  } catch (err) {
    console.log(err);
    //  alert(JSON.stringify(err));
    yield put(fipeFailure());
  }
}

export default all([takeLatest('@fipe/LIST_REQUEST', getFipes)]);
