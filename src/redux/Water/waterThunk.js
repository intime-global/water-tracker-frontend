import { createAsyncThunk } from '@reduxjs/toolkit';
import { addWater, getWaterToday, deleteWater, editWater  } from './waterApi.js';

export const addWaterThunk = createAsyncThunk(
  'Water/addWater',
  async (body, { rejectWithValue, getState }) => {
    try {
      return await addWater(body, getState().auth.token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getWaterTodayThunk = createAsyncThunk(
  'Water/getWaterToday',
  async (_,{ rejectWithValue,getState}) => {
    try {
      return await getWaterToday(_, getState().auth.token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteWaterTodayThunk = createAsyncThunk(
    'water/deleteWaterToday',
    async (id,{ rejectWithValue,getState}) => {
      try {
        return await deleteWater( getState().auth.token , id);
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const editWaterTodayThunk = createAsyncThunk(
    'water/editWaterToday',
    async (body,{ rejectWithValue,getState}) => {
      try {
        return await editWater( getState().auth.token, body);
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
