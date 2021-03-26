import { all } from 'redux-saga/effects';
import auth from './appModules/auth/sagas';
import favorite from './appModules/favorite/sagas';
import brewery from './appModules/brewery/sagas';
import fipe from './appModules/fipe/sagas';

export default function* appSagas() {
  return yield all([auth, favorite, fipe, brewery]);
}
