import { createSlice } from '@reduxjs/toolkit';
import {
  addWaterThunk,
  getWaterTodayThunk,
  deleteWaterTodayThunk,
  editWaterTodayThunk,
} from './waterThunk.js';

const initialState = {
    items: [],
    todayData: {},
    listItems: [],
    isLoading: false,
    error: null,
  };

const handlePending = state => {
    state.error = null;
    state.isLoading = true;
  };

const handleReject = (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
  };

const handleFullfilled = (state, { payload }) => {
    state.isLoading = false;
    state.items = {...state.items,...payload}
  };

const handleFullfilledDelete = (state, { payload }) => {
    state.isLoading = false;
    state.items = payload;
  };

const handleFullfilledGetToday = (state, { payload }) => {
    state.isLoading = false;
    state.listItems = payload;
    state.todayData = payload;
  };

const handleFullfilledEdit = (state, { payload }) => {
    state.isLoading = false;
    state.items = payload;
  };

export const waterSlice = createSlice({
    name: 'Water',
    initialState,
    extraReducers: builder => {
      builder

        .addCase(addWaterThunk.pending, handlePending)
        .addCase(addWaterThunk.rejected, handleReject)
        .addCase(addWaterThunk.fulfilled, handleFullfilled)

        .addCase(getWaterTodayThunk.pending, handlePending)
        .addCase(getWaterTodayThunk.rejected, handleReject)
        .addCase(getWaterTodayThunk.fulfilled, handleFullfilledGetToday)

        .addCase(deleteWaterTodayThunk.pending, handlePending)
        .addCase(deleteWaterTodayThunk.rejected, handleReject)
        .addCase(deleteWaterTodayThunk.fulfilled, handleFullfilledDelete)

        .addCase(editWaterTodayThunk.pending, handlePending)
        .addCase(editWaterTodayThunk.rejected, handleReject)
        .addCase(editWaterTodayThunk.fulfilled, handleFullfilledEdit);
    },
  });

  export const waterReducer = waterSlice.reducer;
