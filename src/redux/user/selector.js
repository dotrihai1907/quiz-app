import { createSelector } from "reselect";

// trỏ đến state của reducer user
const selectUser = (state) => state.user;

// trỏ đến item users của userSlice
export const selectUsers = createSelector(
  [selectUser],
  (userSlice) => userSlice?.users // userSlice && userSlice.users
);
