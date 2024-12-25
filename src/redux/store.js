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
import themeSlice from './theme/slice.js';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['accessToken'],
};

const themePersistConfig = {
  key: 'theme',
  storage,
  whitelist: ['theme'],
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedThemeReducer = persistReducer(themePersistConfig, themeSlice);

export const perStore = configureStore({
  reducer: {
    user: persistedUserReducer,
    water: waterSlice,
    theme: persistedThemeReducer,
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
