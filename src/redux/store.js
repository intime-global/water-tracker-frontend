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
import waterSlice from './water/waterSlice.js';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['accessToken'],
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

export const perStore = configureStore({
  reducer: {
    user: persistedUserReducer,
    water: waterSlice,
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
