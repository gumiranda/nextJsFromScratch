import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import auth from './appModules/auth/reducer';
import favorite from './appModules/favorite/reducer';
import brewery from './appModules/brewery/reducer';

import appSagas from './appSagas';

const sagaMonitor = null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware, createLogger()];

const enhancer = applyMiddleware(...middlewares);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'favorite', 'brewery'],
};

const rootReducer = combineReducers({
  auth,
  favorite,
  brewery,
});
const appStore = createStore(persistReducer(persistConfig, rootReducer), enhancer);

const appPersistor = persistStore(appStore);

sagaMiddleware.run(appSagas);

export { appStore, appPersistor };
