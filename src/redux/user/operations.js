import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosInstance,
  setAuthHeader,
  clearAuthHeader,
} from '../../services/axios.config.js';
import { notifyError, notifySuccess } from '../../services/notifications.js';

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * Registration
 * User is still not active, he needs to confirm his email
 */
export const register = createAsyncThunk(
  'user/register',
  async (credentials, thunkAPI) => {
    try {
      notifySuccess('Registration was successful');
      const { data } = await authAPI.post('/auth/register', credentials);
      return data;
    } catch (error) {
      notifyError('Registration failed');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
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
      notifySuccess('Email confirmed');
      const { data } = await authAPI.post('/auth/confirm-email', credentials);
      return data;
    } catch (error) {
      notifyError('Email has not been confirmed');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
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
      notifySuccess('You have successfully logged in');
      const { data } = await authAPI.post('/auth/login', userInfo);
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      notifyError('Login failed');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
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
      const { data } = await authAPI.get('/auth/get-oauth-url');
      return data;
    } catch (error) {
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
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
      const { data } = await authAPI.post('/auth/confirm-oauth', credentials);
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Refresh
 * Refresh state with initial info about user
 */
export const refresh = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/users');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.user.accessToken !== null;
    },
  },
);

/**
 * Refresh Session
 * User gets new accessToken
 */
export const refreshSession = createAsyncThunk(
  'user/refresh-session',
  async (_, thunkAPI) => {
    try {
      const { data } = await authAPI.post('/auth/refresh');
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.user.accessToken !== null;
    },
  },
);

/**
 * Logout
 * Send request to clear session data on backend and clean up Auth Header
 */
export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    notifySuccess('You have successfully logged out');
    await authAPI.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    notifyError('Logout failed');
    if (error.response?.data?.data?.message)
      return thunkAPI.rejectWithValue(error.response.data.data.message);
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
      notifySuccess('Password reset email sent');
      const { data } = await authAPI.post('/auth/send-reset-email', email);
      return data;
    } catch (error) {
      notifyError('Password reset email was not sent');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
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
      notifySuccess('Password successfully reset');
      const { data } = await authAPI.post('/auth/reset-pwd', credentials);
      return data;
    } catch (error) {
      notifyError('Password reset failed');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
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
      notifySuccess('New user added successfully');
      const response = await axiosInstance.get('/users/');
      return response.data;
    } catch (error) {
      notifyError('Failed to add new user');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      return thunkAPI.rejectWithValue(error.message);
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
      notifySuccess('User data edited successfully');
      const response = await axiosInstance.patch('/users/', data);
      return response.data;
    } catch (error) {
      notifyError('Failed to save changes');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      return thunkAPI.rejectWithValue(error.message);
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
      notifySuccess('Avatar changed successfully');
      const response = await axiosInstance.patch(
        '/users/avatar',
        {
          avatarURL: photo,
        },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      return response.data;
    } catch (error) {
      notifyError('Failed to change avatar');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      return thunkAPI.rejectWithValue(error.message);
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
      notifySuccess('Your water rate changed successfully');
      const response = await axiosInstance.patch('/water/rate/', data);
      return response.data;
    } catch (error) {
      notifyError('Failed to change water rate');
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
