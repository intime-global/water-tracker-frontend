import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteWater, editWater  } from './waterApi';

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
