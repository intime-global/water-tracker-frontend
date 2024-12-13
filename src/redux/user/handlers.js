import { initialState } from './userSlice';

export const handleUserInfo = (state, { payload }) => {
  state.user = payload;
};

export const handleEditUser = (state, { payload }) => {
  state.user = { ...state.user, ...payload };
};

export const handleUpdateAvatar = (state, { payload }) => {
  state.user.avatarURL = payload.avatarURL;
};

export const handleWaterRate = (state, { payload }) => {
  state.user.waterRate = payload.waterRate;
};
