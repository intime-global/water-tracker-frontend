export const handleUserInfo = (state, { payload }) => {
  state.user = payload.data.user;
  state.isLoading = false;
};

export const handleLogin = (state, { payload }) => {
  state.user = payload.data.user;
  state.accessToken = payload.data.accessToken;
  state.isLoading = false;
  state.isRefreshing = false;
  state.isLoggedIn = true;
};

export const handleEditUser = (state, { payload }) => {
  state.isLoading = false;
  state.user = { ...state.user, ...payload };
};

export const handleUpdateAvatar = (state, { payload }) => {
  state.isLoading = false;
  state.user.avatarURL = payload.avatarURL;
};

export const handleWaterRate = (state, { payload }) => {
  state.isLoading = false;
  state.user.waterRate = payload.waterRate;
};
