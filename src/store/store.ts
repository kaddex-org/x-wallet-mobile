import {ENCRYPTION_KEY} from '@env';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';
import rootSaga from './saga';
import auth from './auth';
import userWallet from './userWallet';
import contacts from './contacts';
import networks from './networks';
import transfers from './transfer';
import history from './history';
import {Storage} from 'redux-persist/es/types';

const plainStorage = new MMKV();
const userStorage = new MMKV({
  id: 'user-storage',
  encryptionKey: ENCRYPTION_KEY,
});
const authStorage = new MMKV({
  id: 'auth-storage',
  encryptionKey: ENCRYPTION_KEY,
});

const MMKVStorage = (storage: MMKV) =>
  ({
    setItem: async (key, value) => {
      storage.set(key, value);
      return Promise.resolve(true);
    },
    getItem: async key => {
      const secureStorageValue = storage.getString(key);
      const plainStorageValue = plainStorage.getString(key);
      if (plainStorageValue && secureStorageValue !== plainStorageValue) {
        storage.set(key, plainStorageValue);
        plainStorage.delete(key);
        return Promise.resolve(plainStorageValue);
      } else if (
        plainStorageValue &&
        secureStorageValue === plainStorageValue
      ) {
        plainStorage.delete(key);
      }
      return Promise.resolve(secureStorageValue);
    },
    removeItem: async key => {
      storage.delete(key);
      return Promise.resolve();
    },
  } as Storage);

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const userWalletPersistConfig = {
  key: 'userWallet',
  storage: MMKVStorage(userStorage),
  blacklist: ['initialized'],
};

const contactsPersistConfig = {
  key: 'contacts',
  storage: MMKVStorage(plainStorage),
};

const historyPersistConfig = {
  key: 'history',
  storage: MMKVStorage(plainStorage),
};

const authPersistConfig = {
  key: 'auth',
  storage: MMKVStorage(authStorage),
  blacklist: ['isAuthorized', 'newPinCode'],
};

const networkPersistConfig = {
  key: 'networks',
  storage: MMKVStorage(plainStorage),
};

const transferPersistConfig = {
  key: 'transfers',
  storage: MMKVStorage(plainStorage),
  blacklist: ['showTransferBubble'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  userWallet: persistReducer(userWalletPersistConfig, userWallet),
  contacts: persistReducer(contactsPersistConfig, contacts),
  history: persistReducer(historyPersistConfig, history),
  networks: persistReducer(networkPersistConfig, networks),
  transfers: persistReducer(transferPersistConfig, transfers),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
