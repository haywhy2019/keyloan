import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    loanPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    loanSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    loanFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
    loanErrReset: (state) => {
      state.error = ""
    },
    loanSuccessRest: (state) => {
      state.error = ""
    }
  },
});

export const {
  loanPending,
  loanSuccess,
  loanFailure,
  loanErrReset,
  loanSuccessRest
} = loanSlice.actions;
export default loanSlice.reducer;
