import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const updateDarkMode = createAsyncThunk("darkMode/updateDarkMode", async (darkMode, { getState }) => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    // Update the user's document in the database with the new dark mode status
    console.log("Updating dark mode status in database...");
    await firebase.firestore().collection("users").doc(currentUser.uid).update({
      darkMode: darkMode,
    });
  }
});
export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    // Read the initial dark mode value from the session storage or default to false
    darkMode: JSON.parse(sessionStorage.getItem("darkMode")) || false,
  },
  reducers: {
    setDarkMode: (state, action) => {
      // Save the dark mode value in the session storage
      sessionStorage.setItem("darkMode", JSON.stringify(!action.payload));

      // Update the Redux state
      state.darkMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDarkMode.fulfilled, (state, action) => {
        // Update the local state when the user's document in the database is successfully updated
        state.darkMode = action.meta.arg;
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { setDarkMode } = darkModeSlice.actions;
export const selectDarkMode = (state) => state.darkMode.darkMode;
export default darkModeSlice.reducer;
