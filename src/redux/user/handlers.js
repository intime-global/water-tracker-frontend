export const handleUserInfo = (state, { payload }) => {
  state.user = payload.data;
  state.isLoading = false;
};

export const handleLogin = (state, { payload }) => {
  state.accessToken = payload.data.accessToken;
  state.isLoading = false;
  state.isRefreshing = false;
  state.isLoggedIn = true;
};

export const handleEditUser = (state, { payload }) => {
  state.isLoading = false;
  state.user = { ...state.user, ...payload.data };
};

export const handleUpdateAvatar = (state, { payload }) => {
  state.isLoading = false;
  state.user.photo = payload.data.photo;
};

export const handleWaterRate = (state, { payload }) => {
  state.isLoading = false;
  state.user.waterRate = payload.data.waterRate;
};
