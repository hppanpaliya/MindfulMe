import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import moodReducer from "./features/mood/moodSlice";
import supportGroupsReducer from "./features/supportGroups/supportGroupsSlice";
import habitReducer from "./features/habits/habitsSlice";




const rootReducer = combineReducers({
  auth: authReducer,
  mood: moodReducer,
  supportGroups: supportGroupsReducer,
  habits: habitReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
