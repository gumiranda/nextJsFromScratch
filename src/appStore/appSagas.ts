import { all } from 'redux-saga/effects';
import auth from './appModules/auth/sagas';
import favorite from './appModules/favorite/sagas';
import brewery from './appModules/brewery/sagas';
import puppy from './appModules/puppy/sagas';

export default function* appSagas() {
  return yield all([auth, favorite, puppy, brewery]);
}
