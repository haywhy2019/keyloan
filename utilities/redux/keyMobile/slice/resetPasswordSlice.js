import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetPasswordPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
      }
    },
    resetPasswordSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    resetPasswordFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
    resetPasswordReset: (state) => {
      state.success = ""
      state.error = ""
    }
  
  },
});

export const {
  resetPasswordPending,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetPasswordReset
} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
