import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const accountTypeSlice = createSlice({
  name: "accountType",
  initialState,
  reducers: {
    accountTypePending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    accountTypeSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    accountTypeFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
    accountTypeReset: (state) => {
      state.error = "",
      state.success = ""
    }
  },
});

export const {
  accountTypePending,
  accountTypeSuccess,
  accountTypeFailure,
  accountTypeReset,

} = accountTypeSlice.actions;
export default accountTypeSlice.reducer;
