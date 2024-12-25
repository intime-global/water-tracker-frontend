import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  confirmEmail,
  confirmOauth,
  getOauthUrl,
  login,
  logout,
  refresh,
  refreshSession,
  register,
  resetPassword,
  sendResetPasswordEmail,
  getUser,
  editUserInfo,
  editUserAvatar,
  editUserWaterRate,
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
    waterRate: 2000,
    gender: 'famale',
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
      .addCase(confirmEmail.fulfilled, handleLogin)
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshSession.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshSession.fulfilled, handleLogin)
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(refreshSession.rejected, (state, action) => {
        state.accessToken = null;
        state.isError = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(getUser.fulfilled, handleUserInfo)
      .addCase(editUserInfo.fulfilled, handleEditUser)
      .addCase(editUserAvatar.fulfilled, handleUpdateAvatar)
      .addCase(editUserWaterRate.fulfilled, handleWaterRate)
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
          getUser.pending,
          editUserInfo.pending,
          editUserAvatar.pending,
          editUserWaterRate.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        },
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
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
          resetPassword.rejected,
          sendResetPasswordEmail.rejected,
          getUser.rejected,
          editUserInfo.rejected,
          editUserAvatar.rejected,
          editUserWaterRate.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
          state.isRefreshing = false;
        },
      );
  },
});

export default userSlice.reducer;
