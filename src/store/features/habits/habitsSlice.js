import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  toggleCompletion,
  maintainHabit,
} from "../../../components/HabitTracker/utils/habits";

export const addHabitAsync = createAsyncThunk(
  "habits/addHabit",
  async (payload) => {
    const { uid, habit } = payload;
    await addHabit(uid, habit);
  }
);

export const fetchHabitsAsync = createAsyncThunk(
  "habits/fetchHabits",
  async (uid) => {
    const habits = await getHabits(uid);
    return habits;
  }
);

export const updateHabitAsync = createAsyncThunk(
  "habits/updateHabit",
  async (payload) => {
    const { uid, habitId, updatedData } = payload;
    await updateHabit(uid, habitId, updatedData);
  }
);

export const deleteHabitAsync = createAsyncThunk(
  "habits/deleteHabit",
  async (payload) => {
    const { uid, habitId } = payload;
    await deleteHabit(uid, habitId);
  }
);

export const toggleCompletionAsync = createAsyncThunk(
  "habits/toggleCompletion",
  async (payload) => {
    const { uid, habitId } = payload;
    await toggleCompletion(uid, habitId);
  }
);

//import { maintainHabit } from "../../../../utils/habits";

export const maintainHabitAsync = createAsyncThunk(
  "habits/maintainHabit",
  async (payload) => {
    const { uid, habitId } = payload;
    await maintainHabit(uid, habitId);
  }
);

const habitSlice = createSlice({
  name: "habits",
  initialState: {
    habits: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHabitsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.habits = action.payload;
      })
      .addCase(fetchHabitsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default habitSlice.reducer;
