export const waterSelector = state => state.water.items;

export const todaySelector = state => state.water.todayData;

export const waterListSelector = (state) => state.water.listItems;

export const waterErrorSelector = (state) => state.water.error;

export const waterIsLoadingSelector = (state) => state.water.isLoading;
