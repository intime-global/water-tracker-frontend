import { createSlice } from '@reduxjs/toolkit';
import {
  addWaterThunk,
  getWaterTodayThunk,
  getWaterMonthThunk,
  deleteWaterThunk,
  editWaterThunk,
} from './waterThunk.js';

import {
  handleAddWater,
  handleDeleteWater,
  handleEditWater,
  handleGetToday,
  handleGetMonth,
} from './handlers.js';

const initialState = {
  month: [],
  today: {
    waterList: [],
  },
};

export const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    cleanWaterRedux: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWaterThunk.fulfilled, handleAddWater)
      .addCase(editWaterThunk.fulfilled, handleEditWater)
      .addCase(deleteWaterThunk.fulfilled, handleDeleteWater)
      .addCase(getWaterTodayThunk.fulfilled, handleGetToday)
      .addCase(getWaterMonthThunk.fulfilled, handleGetMonth);
  },
});

export const waterReducer = waterSlice.reducer;
