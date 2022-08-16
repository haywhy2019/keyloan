import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const allBranchSlice = createSlice({
  name: "allBranch",
  initialState,
  reducers: {
    branchPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    branchSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    branchFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
    reset: (state) => {
      state.error = "",
      state.success = ""
    }
  },
});

export const {
  branchPending,
  branchSuccess,
  branchFailure,
  branchReset,

} = allBranchSlice.actions;
export default allBranchSlice.reducer;
