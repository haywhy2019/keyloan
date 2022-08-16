import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const bvnSlice = createSlice({
  name: "bvn",
  initialState,
  reducers: {
    bvnPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    bvnSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    bvnFailure: (state, { payload }) => {
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
  bvnPending,
  bvnSuccess,
  bvnFailure,
  reset,

} = bvnSlice.actions;
export default bvnSlice.reducer;
