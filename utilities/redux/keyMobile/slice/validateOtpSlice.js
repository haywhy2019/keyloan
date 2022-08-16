import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const otpValidateSlice = createSlice({
  name: "otpValidate",
  initialState,
  reducers: {
    otpValidatePending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    otpValidateSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    otpValidateFailure: (state, { payload }) => {
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
  otpValidatePending,
  otpValidateSuccess,
  otpValidateFailure,
  reset,

} = otpValidateSlice.actions;
export default otpValidateSlice.reducer;
