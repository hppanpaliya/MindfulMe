import { createSlice } from "@reduxjs/toolkit";
import app from "../../../utils/firebase";

export const moodSlice = createSlice({
  name: "mood",
  initialState: {
    loading: false,
    moods: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMoods: (state, action) => {
      state.moods = action.payload;
    },
  },
});

export const { setLoading, setMoods } = moodSlice.actions;

export const createMood = (moodData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const moodsCollection = app
        .firestore()
        .collection("users")
        .doc(moodData.userId)
        .collection("moods");
      await moodsCollection.add(moodData);
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  };
};

export const getMoods = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const moodsCollection = app
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("moods");
      const querySnapshot = await moodsCollection
        .where("userId", "==", userId)
        .orderBy("date", "asc")
        .get();
      const moods = [];
      querySnapshot.forEach((doc) => {
        moods.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setMoods(moods));
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  };
};

export default moodSlice.reducer;
