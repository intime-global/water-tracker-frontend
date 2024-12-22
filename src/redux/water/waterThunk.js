import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/axios.config.js';
import { notifyError, notifySuccess } from '../../services/notifications.js';

export const addWater = createAsyncThunk(
  'water/addWater',
  async (data, thunkApi) => {
    try {
      const response = await axiosInstance.post('/water', data);
      notifySuccess('Water added');
      return response.data;
    } catch (error) {
      notifyError('Failed to add water');
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred',
      );
    }
  },
);

export const editWater = createAsyncThunk(
  'water/editWater',
  async ({ id, date, waterVolume }, thunkApi) => {
    try {
      const newWater = { date, waterVolume };
      const response = await axiosInstance.patch(`/water/${id}`, newWater);
      notifySuccess('Water edited');
      return response.data;
    } catch (error) {
      notifyError('Failed to edit water');
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred',
      );
    }
  },
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkApi) => {
    try {
      console.log(id);
      const response = await axiosInstance.delete(`/water/${id}`);
      notifySuccess('Water deleted');
      if (response.status === 204) {
        return id;
      }
      return response.data;
    } catch (error) {
      notifyError('Failed to delete water');
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred',
      );
    }
  },
);

export const getWaterToday = createAsyncThunk(
  'water/getWaterToday',
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get('/water/today');
      return response.data;
    } catch (error) {
      notifyError('Failed to get today water');
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred',
      );
    }
  },
);

export const getWaterMonth = createAsyncThunk(
  'water/getWaterMonth',
  async (data, thunkApi) => {
    // Since we save month in Javascript format (from 0 to 11), we do +1 only here
    const requestParams = {
      month: data.month + 1,
      year: data.year,
    };
    try {
      const response = await axiosInstance.get('/water/month', {
        params: requestParams,
      });
      return response.data;
    } catch (error) {
      notifyError('Failed to get month water');
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred',
      );
    }
  },
);
