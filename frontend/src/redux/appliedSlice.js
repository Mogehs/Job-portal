import { createSlice } from "@reduxjs/toolkit";

let appliedSlice = createSlice({
  name: "appliedJobs",
  initialState: {
    appliedJobs: [],
  },
  reducers: {
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
  },
});

export const { setAppliedJobs } = appliedSlice.actions;
export default appliedSlice.reducer;
