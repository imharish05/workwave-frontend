import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  loading: false,
  error: null,
};

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    fetchAllJobsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllJobsSuccess(state, action) {
      state.loading = false;
      state.allJobs = action.payload;
    },
    fetchAllJobsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllJobs(state) {
      state.allJobs = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchAllJobsStart,
  fetchAllJobsSuccess,
  fetchAllJobsFailure,
  clearAllJobs,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
