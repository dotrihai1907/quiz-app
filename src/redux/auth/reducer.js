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
      state.auth = { ...state.auth, tokens: action.payload };
    },
  },
});

export const { loginSuccess, refreshSuccess } = authSlice.actions;
export default authSlice.reducer;
