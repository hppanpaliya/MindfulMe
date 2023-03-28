
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducers from "./features/auth/authSlice";

const rootReducer = combineReducers({
  auth: userReducers,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;