import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const loanCreateSlice = createSlice({
  name: "loanCreate",
  initialState,
  reducers: {
    loanCreatePending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    loanCreateSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    loanCreateFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
    loanCreateErrReset: (state) => {
      state.error = ""
    },
    loanCreateSuccessReset: (state) => {
      state.success = ""
    }
  },
});

export const {
  loanCreatePending,
  loanCreateSuccess,
  loanCreateFailure,
  loanCreateErrReset,
  loanCreateSuccessReset
} = loanCreateSlice.actions;
export default loanCreateSlice.reducer;
