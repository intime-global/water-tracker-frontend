import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/axios.config.js';
import { notifyError, notifySuccess } from '../../services/notifications.js';

export const addWaterThunk = createAsyncThunk(
  'water/addWater',
  async (data, thunkApi) => {
    try {
      const response = await axiosInstance.post('/water', data);
      if (!response.ok) {
        throw new Error('Failed to add water');
      }
      notifySuccess('Water added');
      return response;
    } catch (error) {
      notifyError('Failed to add water');
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const editWaterThunk = createAsyncThunk(
  'water/editWater',
  async ({ id, date, waterVolume }, thunkApi) => {
    try {
      const newWater = { date, waterVolume };
      const response = await axiosInstance.patch(`/water/${id}`, newWater);
      if (!response.ok) {
        throw new Error('Failed to edit water');
      }
      notifySuccess('Water edited');
      return response;
    } catch (error) {
      notifyError('Failed to edit water');
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteWaterThunk = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkApi) => {
    try {
      const response = await axiosInstance.delete(`/water/${id}`);
      if (!response.ok) {
        throw new Error('Failed to delete water');
      }
      notifySuccess('Water deleted');
      return response;
    } catch (error) {
      notifyError('Failed to delete water');
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const getWaterTodayThunk = createAsyncThunk(
  'water/getWaterToday',
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get('/water/today');
      if (!response.ok) {
        throw new Error('Failed to get today water');
      }
      return response;
    } catch (error) {
      notifyError('Failed to get today water');
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const getWaterMonthThunk = createAsyncThunk(
  'water/getWaterMonth',
  async (data, thunkApi) => {
    try {
      const response = await axiosInstance.get('/water/month', {
        params: data,
      });
      if (!response.ok) {
        throw new Error('Failed to get month water');
      }
      return response;
    } catch (error) {
      notifyError('Failed to get month water');
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);
