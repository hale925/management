import { createSlice } from '@reduxjs/toolkit';

const positionsSlice = createSlice({
  name: 'positions',
  initialState: {
    positions: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPositionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPositionsSuccess: (state, action) => {
      state.loading = false;
      state.positions = action.payload;
    },
    fetchPositionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPosition: (state, action) => {
      state.positions.push(action.payload);
    },
    updatePosition: (state, action) => {
      const index = state.data.findIndex((pos) => pos.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deletePosition: (state, action) => {
      state.data = state.data.filter((pos) => pos.id !== action.payload);
    },
  },
});

export const {
  fetchPositionsStart,
  fetchPositionsSuccess,
  fetchPositionsFailure,
  createPosition,
  updatePosition,
  deletePosition,
} = positionsSlice.actions;

export default positionsSlice.reducer;
