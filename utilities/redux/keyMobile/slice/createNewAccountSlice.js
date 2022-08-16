import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const createNewAccountSlice = createSlice({
  name: "createNewAccount",
  initialState,
  reducers: {
    createNewAccountPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    createNewAccountSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    createNewAccountFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
    createNewAccountReset: (state) => {
      state.error = "",
      state.success = ""
    }
  },
});

export const {
  createNewAccountPending,
  createNewAccountSuccess,
  createNewAccountFailure,
  createNewAccountReset,

} = createNewAccountSlice.actions;
export default createNewAccountSlice.reducer;
