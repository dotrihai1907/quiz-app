import { createSelector } from "reselect";

// trỏ đến state của reducer authentication
const selectAuthentication = (state) => state.authentication;

// trỏ đến item auth của authSlice
const selectAuth = createSelector(
  [selectAuthentication],
  (authSlice) => authSlice?.auth // authSlice && authSlice.auth
);

//---------------user--------------------------------

const selectUser = createSelector([selectAuth], (auth) => auth?.user);

export const selectRole = createSelector([selectUser], (user) => user?.role);

//---------------tokens--------------------------------

const selectTokens = createSelector([selectAuth], (auth) => auth?.tokens);

export const selectAccessToken = createSelector(
  [selectTokens],
  (tokens) => tokens?.access.token
);

export const selectRefreshToken = createSelector(
  [selectTokens],
  (tokens) => tokens?.refresh.token
);
