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
} from './operations.js';

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
      })
      .addCase(confirmOauth.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(sendResetPasswordEmail.fulfilled)
      .addCase(getOauthUrl.fulfilled)
      .addMatcher(
        isAnyOf(
          confirmEmail.pending,
          confirmOauth.pending,
          getOauthUrl.pending,
          login.pending,
          register.pending,
          resetPassword.pending,
          sendResetPasswordEmail.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        },
      )
      .addMatcher(
        isAnyOf(
          confirmEmail.rejected,
          confirmOauth.rejected,
          login.rejected,
          register.rejected,
          resetPassword.rejected,
          sendResetPasswordEmail.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        },
      );
  },
});

export default authSlice.reducer;
