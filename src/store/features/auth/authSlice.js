import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const { uid, email, displayName } = action.payload;
      state.loading = false;
      state.user = { uid, email, displayName };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth; // selectors
export default authSlice.reducer;