import { configureStore } from "@reduxjs/toolkit";
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
  
import { authReducer } from "./auth/authSlice";
import { recommendationReducer } from "./recommendations/recommendationsSlice";
import { diaryReducer } from "./diary/diarySlice";
import { searchProductsReducer } from "./searchProducts/searchProductsSlice";
import { summaryReducer } from "./summary/summarySlice";

 const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
  const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    recommendation: recommendationReducer,
    diary: diaryReducer,
    search: searchProductsReducer,
    summary: summaryReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export const persistor = persistStore(store);