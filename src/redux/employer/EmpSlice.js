import {createSlice} from '@reduxjs/toolkit';

export const empSlice = createSlice({
  name:"employer",
  initialState: {
    empData: null,
  },
  reducer:{
    UpdateEmpDetails: (state, action) => {
      state.empData = action.payload;
    }
  }
});

export const {UpdateEmpDetails} = empSlice.actions;
export default empSlice.reducer;