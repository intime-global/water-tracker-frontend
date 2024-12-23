export const handleAddWater = (state, { payload }) => {
  if (state.today.notes) {
    state.today.notes.push(payload.data.waterNote);
  } else {
    state.today.notes = [payload.data.waterNote];
  }
  state.isLoading = false;
};

export const handleEditWater = (state, { payload }) => {
  const arr = state.today.notes;
  const index = arr.findIndex((item) => item._id === payload.data._id);
  if (index !== -1) arr[index] = payload.data;
  state.isLoading = false;
};

export const handleDeleteWater = (state, { payload }) => {
  if (state.today.notes) {
    state.today.notes = state.today.notes.filter(
      (note) => note._id !== payload,
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
