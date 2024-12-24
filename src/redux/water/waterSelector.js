export const selectTodayWater = (state) => state.water.today.notes;

export const selectMonthWater = (state) => state.water.month;

export const selectWaterRate = (state) => state.user.user?.waterRate;

export const selectWaterIsLoading = (state) => state.water.isLoading;
