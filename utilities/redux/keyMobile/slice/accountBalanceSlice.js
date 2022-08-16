import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const accountBalanceSlice = createSlice({
  name: "accountBalance",
  initialState,
  reducers: {
    accountBalancePending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    accountBalanceSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
      state.success = payload;
      state.error = "";
    },
    accountBalanceFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = "";
        state.error = payload;
      }
    },
    accountBalanceReset: (state) => {
      (state.error = ""), (state.success = "");
    },
  },
});

export const {
  accountBalancePending,
  accountBalanceSuccess,
  accountBalanceFailure,
  accountBalanceReset,
} = accountBalanceSlice.actions;
export default accountBalanceSlice.reducer;
