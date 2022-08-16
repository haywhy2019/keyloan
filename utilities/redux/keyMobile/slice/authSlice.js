import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  isAuth: false,
  user: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error= ""
      }
    },
    loginSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.isAuth = true;
        state.user = payload;
        state.error = ""
      }
    },
    loginFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.isAuth = false;
        state.error = payload
        state.user = ""
      }
    },
    resetError: (state) => {
      state.error = ""
     },
     logout: (state) => {

     }
  },
});

export const { loginPending, loginFailure, loginSuccess, resetError, logout} = authSlice.actions;
export default authSlice.reducer;
