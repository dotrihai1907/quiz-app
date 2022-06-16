import { createSelector } from "reselect";

// trỏ đến state của reducer authentication
const selectAuthentication = (state) => state.authentication;

// trỏ đến item auth của authSlice
const selectAuth = createSelector(
  [selectAuthentication],
  (authSlice) => authSlice?.auth // authSlice && authSlice.auth
);

// trỏ đến item loading của authSlice
export const selectLoading = createSelector(
  [selectAuthentication],
  (authSlice) => authSlice?.loading // authSlice && authSlice.loading
);

//---------------user--------------------------------

const selectUser = createSelector([selectAuth], (auth) => auth?.user);

export const selectRole = createSelector([selectUser], (user) => user?.role);

export const selectScore = createSelector([selectUser], (user) => user?.score);

export const selectUsernameAuth = createSelector(
  [selectUser],
  (user) => user?.username
);

export const selectAvatar = createSelector(
  [selectUser],
  (user) => user?.avatar
);

export const selectEmail = createSelector([selectUser], (user) => user?.email);

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
