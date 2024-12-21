import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addWater,
  getWaterToday,
  getWaterMonth,
  deleteWater,
  editWater,
} from './waterThunk.js';

import { logout } from '../user/operations.js';

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
  isLoading: false,
};

export const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    cleanWaterRedux: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWater.fulfilled, handleAddWater)
      .addCase(editWater.fulfilled, handleEditWater)
      .addCase(deleteWater.fulfilled, handleDeleteWater)
      .addCase(getWaterToday.fulfilled, handleGetToday)
      .addCase(getWaterMonth.fulfilled, handleGetMonth)
      .addCase(logout.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          addWater.pending,
          editWater.pending,
          deleteWater.pending,
          getWaterToday.pending,
          getWaterMonth.pending,
        ),
        (state) => {
          state.isLoading = true;
        },
      );
  },
});

export default waterSlice.reducer;
