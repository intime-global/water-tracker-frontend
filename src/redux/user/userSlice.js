import { createSlice } from '@reduxjs/toolkit';
import {
  handleUserInfo,
  handleEditUser,
  handleUpdateAvatar,
  handleWaterRate,
} from './handlers';
import {
  getUserThunk,
  editUserInfoThunk,
  editUserAvatarThunk,
  editUserWaterRateThunk,
} from './userOperations';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: '',
      email: '',
      waterRate: 0,
      gender: '',
      avatarURL: '',
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, handleUserInfo)
      .addCase(editUserInfoThunk.fulfilled, handleEditUser)
      .addCase(editUserAvatarThunk.fulfilled, handleUpdateAvatar)
      .addCase(editUserWaterRateThunk.fulfilled, handleWaterRate);
  },
});

export const userReducer = userSlice.reducer;
