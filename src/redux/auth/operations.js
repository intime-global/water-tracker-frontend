import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosInstance,
  setAuthHeader,
  clearAuthHeader,
} from '../../services/axios.config.js';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/auth/register', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const confirmEmail = createAsyncThunk(
  'auth/confirm-email',
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

export const login = createAsyncThunk(
  'auth/login',
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

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk(
  'auth/refresh',
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

export const sendResetPasswordEmail = createAsyncThunk(
  'auth/send-reset-email',
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

export const resetPassword = createAsyncThunk(
  'auth/reset-pwd',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/auth/reset-pwd', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getOauthUrl = createAsyncThunk(
  'auth/get-oauth-url',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/auth/get-oauth-url');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const confirmOauth = createAsyncThunk(
  'auth/confirm-oauth',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        '/auth/confirm-oauth',
        credentials,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
