import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  confirmEmail,
  confirmOauth,
  getOauthUrl,
  login,
  logout,
  refresh,
  register,
  resetPassword,
  sendResetPasswordEmail,
  getUserThunk,
  editUserInfoThunk,
  editUserAvatarThunk,
  editUserWaterRateThunk,
} from './operations.js';
import {
  handleLogin,
  handleUserInfo,
  handleEditUser,
  handleUpdateAvatar,
  handleWaterRate,
} from './handlers.js';

const initialState = {
  user: {
    name: '',
    email: '',
    waterRate: 0,
    gender: '',
    photo: '',
  },
  accessToken: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  isError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(confirmOauth.fulfilled, handleLogin)
      .addCase(login.fulfilled, handleLogin)
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, handleLogin)
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(getUserThunk.fulfilled, handleUserInfo)
      .addCase(editUserInfoThunk.fulfilled, handleEditUser)
      .addCase(editUserAvatarThunk.fulfilled, handleUpdateAvatar)
      .addCase(editUserWaterRateThunk.fulfilled, handleWaterRate)
      .addMatcher(
        isAnyOf(
          register.pending,
          confirmEmail.pending,
          getOauthUrl.pending,
          confirmOauth.pending,
          login.pending,
          logout.pending,
          resetPassword.pending,
          sendResetPasswordEmail.pending,
          getUserThunk.pending,
          editUserInfoThunk.pending,
          editUserAvatarThunk.pending,
          editUserWaterRateThunk.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        },
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          confirmEmail.fulfilled,
          getOauthUrl.fulfilled,
          sendResetPasswordEmail.fulfilled,
          resetPassword.fulfilled,
        ),
        (state) => {
          state.isLoading = false;
        },
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          confirmEmail.rejected,
          getOauthUrl.rejected,
          confirmOauth.rejected,
          login.rejected,
          refresh.rejected,
          resetPassword.rejected,
          sendResetPasswordEmail.rejected,
          getUserThunk.rejected,
          editUserInfoThunk.rejected,
          editUserAvatarThunk.rejected,
          editUserWaterRateThunk.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        },
      );
  },
});

export default userSlice.reducer;
