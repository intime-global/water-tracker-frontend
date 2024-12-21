export const handleAddWater = (state, { payload }) => {
  if (state.today.waterList) {
    state.today.waterList.push(payload.data);
  } else {
    state.today.waterList = [payload.data];
  }
  state.isLoading = false;
};

export const handleEditWater = (state, { payload }) => {
  const arr = state.today.waterList;
  const index = arr.findIndex((item) => item.id === payload.data.id);
  if (index !== -1) arr[index] = payload.data;
  state.isLoading = false;
};

export const handleDeleteWater = (state, { payload }) => {
  if (state.today.waterList) {
    state.today.waterList = state.today.waterList.filter(
      (data) => data.id !== payload.id,
    );
  }
  state.isLoading = false;
};

export const handleGetToday = (state, { payload }) => {
  state.today = payload.data;
  state.isLoading = false;
};

export const handleGetMonth = (state, { payload }) => {
  state.month = payload.data;
  state.isLoading = false;
};
