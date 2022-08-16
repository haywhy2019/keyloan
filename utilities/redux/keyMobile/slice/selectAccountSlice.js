import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountDetails: "",
};
const selectedAccountSlice = createSlice({
  name: "accountDetails",
  initialState,
  reducers: {
    defaultAccount: (state, {payload}) => {
        state.accountDetails = payload
    }
  
  },
});

export const {
 defaultAccount
} = selectedAccountSlice.actions;
export default selectedAccountSlice.reducer;
