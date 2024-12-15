import { configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';
import userSlice from './user/slice.js';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['accessToken'],
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

export const perStore = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default perStore;
export const persistor = persistStore(perStore);
