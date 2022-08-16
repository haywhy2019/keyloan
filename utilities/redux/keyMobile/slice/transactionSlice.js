import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    transactionPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
      }
    },
    transactionSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    transactionFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
    transactionReset: (state) => {
      state.success = ""
      state.error = ""
    }
  
  },
});

export const {
  transactionPending,
  transactionSuccess,
  transactionFailure,
  transactionReset
} = transactionSlice.actions;
export default transactionSlice.reducer;
