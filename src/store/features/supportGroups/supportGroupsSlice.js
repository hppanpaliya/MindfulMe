import { createSlice } from "@reduxjs/toolkit";
import app from "../../../utils/firebase";

export const supportGroupsSlice = createSlice({
  name: "supportGroups",
  initialState: {
    loading: false,
    groups: [],
    selectedGroup: null,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setGroups, setError } = supportGroupsSlice.actions;

export const fetchGroups = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const groupsCollection = app.firestore().collection("groups");
      const querySnapshot = await groupsCollection.get();
      const groups = [];
      querySnapshot.forEach((doc) => {
        groups.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setGroups(groups));
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};

export const createGroup = (groupData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const groupsCollection = app.firestore().collection("groups");
      await groupsCollection.add(groupData);
      dispatch(fetchGroups());
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  };
};

export const selectGroups = (state) => state.supportGroups.groups;

export default supportGroupsSlice.reducer;
