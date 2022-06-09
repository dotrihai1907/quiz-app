import { createSelector } from "reselect";

// trỏ đến state của reducer user
const selectUser = (state) => state.user;

// trỏ đến item users của userSlice
const selectUsersByAdmin = createSelector(
  [selectUser],
  (userSlice) => userSlice?.users // userSlice && userSlice.users
);

//-----------------users-------------------------------

export const selectUsers = createSelector(
  [selectUsersByAdmin],
  (users) => users?.results
);
