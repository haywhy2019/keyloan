import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const userImageSlice = createSlice({
  name: "userImage",
  initialState,
  reducers: {
    userImagePending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
      }
    },
    userImageSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
      state.success = payload;
      state.error = "";
    },
    userImageFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = payload;
      }
    },
  },
});

export const {
  userImagePending,
  userImageSuccess,
  userImageFailure,
  

} = userImageSlice.actions;
export default userImageSlice.reducer;
