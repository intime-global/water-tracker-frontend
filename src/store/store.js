import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';

  export const perStore = configureStore({
    reducer: {
      },
});



export const persistor = persistStore(perStore);
