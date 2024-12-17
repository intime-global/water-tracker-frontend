//export const waterListSelector = (state) => state.water.listItems;

//export const waterErrorSelector = (state) => state.water.error;

export const waterIsLoadingSelector = (state) => state.water.isLoading;

export const selectTodayWater = state => state.water.today;

export const selectMonthWater = state => state.water.month;
