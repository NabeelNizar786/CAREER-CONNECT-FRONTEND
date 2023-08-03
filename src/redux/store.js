import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertsSlice } from "./alertsSlice";
import empReducer from './employer/EmpSlice'

const rootReducer = combineReducers({
  emp:empReducer,
  alerts: alertsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;