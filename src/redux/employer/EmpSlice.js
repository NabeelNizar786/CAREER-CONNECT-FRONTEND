import { createSlice } from "@reduxjs/toolkit";

export const EmpSlice = createSlice({
  name:"employer",
  initialState: {
    empData: null,
  },
  reducers: {
    updateEmpDetails: (state, action) => {
      state.empData = action.payload;
    },
  },
});

export const {updateEmpDetails} = EmpSlice.actions;
export default EmpSlice.reducer