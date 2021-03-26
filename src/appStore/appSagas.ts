import { all } from 'redux-saga/effects';
import auth from './appModules/auth/sagas';
import favorites from './appModules/favorites/sagas';

export default function* appSagas() {
  return yield all([auth, favorites]);
}
