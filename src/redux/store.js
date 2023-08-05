import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertsSlice } from "./alertsSlice";
import empReducer from './employer/EmpSlice';
import userReducer from './user/userSlice';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  user:userReducer,
  emp:empReducer,
  alerts: alertsSlice.reducer,
});

const persistConfig = {
  key:'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store)

export {store, persistor};