import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.auth = action.payload;
    },
    refreshSuccess: (state, action) => {
      state.auth.tokens = action.payload;
    },
    calculateScore: (state, action) => {
      const totalTrue = action.payload.filter((item) => item.result === true);
      state.auth.user.score = totalTrue.length;
    },
    logoutSuccess: (state) => {
      state.auth = null;
    },
  },
});

export const { loginSuccess, refreshSuccess, calculateScore, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
