import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosInstance,
  setAuthHeader,
  clearAuthHeader,
} from '../../services/axios.config.js';

/**
 * Registration
 * User is still not active, he needs to confirm his email
 */
export const register = createAsyncThunk(
  'user/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/auth/register', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Confirm Email
 * User is now active and can log in with his password
 */
export const confirmEmail = createAsyncThunk(
  'user/confirm-email',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        '/auth/confirm-email',
        credentials,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Login
 * User gets his accessToken and is allowed to user private part of application
 */
export const login = createAsyncThunk(
  'user/login',
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/auth/login', userInfo);
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Google auth: get OAuth URL
 */
export const getOauthUrl = createAsyncThunk(
  'user/get-oauth-url',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/auth/get-oauth-url');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Google auth: confirm user and get authToken
 */
export const confirmOauth = createAsyncThunk(
  'user/confirm-oauth',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        '/auth/confirm-oauth',
        credentials,
      );
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Refresh
 * User gets new accessToken
 */
export const refresh = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    setAuthHeader(reduxState.auth.accessToken);
    const { data } = await axiosInstance.get('/auth/refresh');
    return data;
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  },
);

/**
 * Logout
 * Send request to clear session data on backend and clean up Auth Header
 */
export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/**
 * Send Reset Password Email
 * User gets link to the Password Reset page with reset token
 */
export const sendResetPasswordEmail = createAsyncThunk(
  'user/send-reset-email',
  async (email, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        '/auth/send-reset-email',
        email,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Reset Password
 * User changes his password from Reset Password Email
 */
export const resetPassword = createAsyncThunk(
  'user/reset-pwd',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/auth/reset-pwd', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Get User Info
 * Just update local info about user
 * Not sure if it is needed at all
 */
export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/user/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/**
 * Edit User Info
 * Update user's profile
 */
export const editUserInfoThunk = createAsyncThunk(
  'user/editUserInfo',
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.patch('/user/', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/**
 * Edit User Avatar
 * Upload new user avatar
 * P.S. we need to upload a file, not an URL! And we will get avatarUrl in the response
 */
export const editUserAvatarThunk = createAsyncThunk(
  'user/editUserAvatar',
  async (photo, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        '/user/avatar',
        {
          avatarURL: photo,
        },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/**
 * Edit User Water Rate
 * Update user's daily norm
 */
export const editUserWaterRateThunk = createAsyncThunk(
  'user/editUserWaterRate',
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.patch('/waterRate/', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
