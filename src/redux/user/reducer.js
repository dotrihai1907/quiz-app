import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getUsersSuccess } = userSlice.actions;
export default userSlice.reducer;
