import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    allCompanies: [],
    companyBySearch: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setAllCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
    setCompanyBySearch: (state, action) => {
      state.companyBySearch = action.payload;
    },
  },
});

export const { setSingleCompany, setAllCompanies, setCompanyBySearch } =
  companySlice.actions;
export default companySlice.reducer;
