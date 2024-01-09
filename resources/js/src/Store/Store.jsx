import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import AuthSlice from './Auth/AuthSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: AuthSlice,
})
const rootReducerPresested = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducerPresested,
})

export const persistor = persistStore(store);
