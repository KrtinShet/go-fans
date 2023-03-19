import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from 'redux-persist/lib/storage'

import { apiSlice } from "./api/apiSlice";
import authSlice from "./authSlice";


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['api'],
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice)


const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export const persistor = persistStore(store)
setupListeners(store.dispatch)