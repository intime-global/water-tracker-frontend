export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUser = (state) => state.user.user;
export const selectIsRefreshing = (state) => state.user.isRefreshing;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectAuthError = (state) => state.user.isError;
