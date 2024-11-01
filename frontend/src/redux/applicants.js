import { createSlice } from "@reduxjs/toolkit";

let applicantSlice = createSlice({
  name: "applicants",
  initialState: {
    applicants: [],
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setApplicants } = applicantSlice.actions;
export default applicantSlice.reducer;
