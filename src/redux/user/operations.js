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
      const { data } = await authAPI.post('/auth/register', credentials);
      notifySuccess(
        'Registration is successful. Please confirm your email via your mailbox',
      );
      return data;
    } catch (error) {
      if (error.response?.data?.data?.message) {
        notifyError(error.response.data.data.message);
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      }
      notifyError('Registration failed');
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
      const response = await authAPI.post('/auth/confirm-email', credentials);
      console.log(response);
      setAuthHeader(response.data.data.accessToken);
      notifySuccess('Email confirmed');
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      notifyError('Email has not been confirmed');
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
      const response = await authAPI.post('/auth/login', userInfo);
      setAuthHeader(response.data.data.accessToken);
      notifySuccess('You have successfully logged in');
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        if (error.response?.data?.data?.message) {
          notifyError(error.response?.data?.data?.message);
        } else {
          notifyError('Incorrect email or password');
        }
      } else {
        notifyError('Login failed');
      }
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
      notifyError('Oauth url failed');
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
      notifyError('Oauth confirm failed');
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
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
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
    await authAPI.post('/auth/logout');
    clearAuthHeader();
    notifySuccess('You are logged out');
  } catch (error) {
    if (error.response?.data?.data?.message)
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    notifyError('Logout failed');
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
      const { data } = await authAPI.post('/auth/send-reset-email', email);
      notifySuccess('Password reset email sent');
      return data;
    } catch (error) {
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      notifyError('Password reset email was not sent');
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
      const { data } = await authAPI.post('/auth/reset-pwd', credentials);
      notifySuccess('Password successfully reset');
      return data;
    } catch (error) {
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      notifyError('Password reset failed');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Get User Info
 * Just update local info about user
 * Not sure if it is needed at all
 */
export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    if (error.response?.data?.data?.message)
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    notifyError('Failed to get user data');
    return thunkAPI.rejectWithValue(error.message);
  }
});

/**
 * Edit User Info
 * Update user's profile
 */
export const editUserInfo = createAsyncThunk(
  'user/editUserInfo',
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.patch('/users', data);
      notifySuccess('User data edited successfully');
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        notifyError('Invalid password');
      } else {
        notifyError('Failed to edit user data');
      }
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
export const editUserAvatar = createAsyncThunk(
  'user/editUserAvatar',
  async (photo, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        '/users/avatar',
        {
          photo: photo,
        },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      notifySuccess('Avatar changed successfully');
      return response.data;
    } catch (error) {
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      notifyError('Failed to change avatar');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Edit User Water Rate
 * Update user's daily norm
 */
export const editUserWaterRate = createAsyncThunk(
  'user/editUserWaterRate',
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.patch('/water/rate', data);
      notifySuccess('Your water rate changed successfully');
      return response.data;
    } catch (error) {
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      notifyError('Failed to change water rate');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
