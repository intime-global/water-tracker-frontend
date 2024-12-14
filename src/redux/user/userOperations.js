import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/axios.config.js';

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
