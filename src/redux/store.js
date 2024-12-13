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

  const authPersistConfig = {
    key: "authSlice",
    storage,
    whitelist: ["token"],
  };

  export const perStore = configureStore({
    reducer: {
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
