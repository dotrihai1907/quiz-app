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
    updateUserSuccess: (state, action) => {
      state.users.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return state.users;
      });
    },
  },
});

export const { getUsersSuccess, updateUserSuccess } = userSlice.actions;
export default userSlice.reducer;
