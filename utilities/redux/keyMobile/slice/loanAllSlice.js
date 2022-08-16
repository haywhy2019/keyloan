import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const loanAllSlice = createSlice({
  name: "loanAll",
  initialState,
  reducers: {
    loanAllPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    loanAllSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    loanAllFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
  },
});

export const {
  loanAllPending,
  loanAllSuccess,
  loanAllFailure,
} = loanAllSlice.actions;
export default loanAllSlice.reducer;
