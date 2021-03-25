import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import api from '@/services/api';
import {getSuccess, getFailure, getSuccessOwner, getFailureOwner} from './list';
import {ratingFailure} from './actions';

export function* getRatings({payload}) {
  try {
    const {nextPage, page, params} = payload;
    let url = `rating/page/${page}`;
    url += '?';
    url += 'type=services&';

    if (params) {
      const {categoriesId, ordenation, text, textual, userFilter} = params;
      if (userFilter) {
        url += 'userFilter=1';
      }
      if (ordenation) {
        url += `sortBy=${ordenation}&`;
      }
      if (categoriesId && categoriesId.length > 0) {
        url += `categoriesId=${encodeURI(
          categoriesId ? categoriesId.toString() : 'a',
        )}&`;
      }
      if (text && text?.length > 0) {
        url += `textual=${textual}&text=${encodeURI(text)}&`;
      }
    }

    const response = yield call(api.get, url);
    if (response.data) {
      const {ratingsCount, ratings} = response.data;
      if (!nextPage) {
        yield put(
          getSuccess({
            ratingsList: ratings,
            ratingsTotal: ratingsCount,
          }),
        );
      } else {
        const {ratingsList} = yield select((state) => state.rating);
        yield put(
          getSuccess({
            ratingsList: [...ratingsList, ...ratings],
            ratingsTotal: ratingsCount,
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
export function* getRatingsOwner({payload}) {
  try {
    const {nextPage, page, params} = payload;
    let url = `rating/page/${page}`;
    url += '?';
    url += 'type=owner&';
    if (params) {
      const {categoriesId, ordenation, text, textual, userFilter} = params;
      if (userFilter) {
        url += 'userFilter=1';
      }
      if (ordenation) {
        url += `sortBy=${ordenation}&`;
      }
      if (categoriesId && categoriesId.length > 0) {
        url += `categoriesId=${encodeURI(
          categoriesId ? categoriesId.toString() : 'a',
        )}&`;
      }
      if (text && text?.length > 0) {
        url += `textual=${textual}&text=${encodeURI(text)}&`;
      }
    }

    const response = yield call(api.get, url);
    if (response.data) {
      const {ratingsCount, ratings} = response.data;
      if (!nextPage) {
        yield put(
          getSuccessOwner({
            ratingsList: ratings,
            ratingsTotal: ratingsCount,
          }),
        );
      } else {
        const {ratingsOwnerList} = yield select((state) => state.rating);
        yield put(
          getSuccessOwner({
            ratingsList: [...ratingsOwnerList, ...ratings],
            ratingsTotal: ratingsCount,
          }),
        );
      }
    } else {
      yield put(getFailureOwner());
    }
  } catch (err) {
    alert('Erro', 'Confira seus dados');
    yield put(getFailureOwner());
  }
}
export function* insertRating({payload}) {
  try {
    const {name, type} = payload;
    const response = yield call(api.post, 'rating', {
      name,
      type: type || 'services',
    });
    if (response?.data) {
      // yield put(reset());
    }
    // const rating = response.data;
  } catch (e) {
    alert('Erro', JSON.stringify(e));
    yield put(ratingFailure());
  }
}
export default all([
  takeLatest('@rating/RATING_REQUEST', insertRating),
  takeLatest('@rating/LIST_REQUEST', getRatings),
  takeLatest('@rating/LIST_OWNER_REQUEST', getRatingsOwner),
]);
