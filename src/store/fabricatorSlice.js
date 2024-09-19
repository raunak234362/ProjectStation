import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fabricatorData: [],
  clientData: [],
};

const fabricatorSlice = createSlice({
  name: 'fabricatorData',
  initialState,
  reducers: {
    addFabricator: (state, action) => {
      state.fabricatorData.push(action.payload);
      localStorage.setItem('fabricatorData', JSON.stringify(state.fabricatorData));
    },
    addClient: (state, action) => {
      state.clientData.push(action.payload);
      localStorage.setItem('clientData', JSON.stringify(state.clientData));
    },
    showFabricator: (state, action) => {
      state.fabricatorData = action.payload;
    },
    deleteFabricator: (state, action) => {
      state.fabricatorData = state.fabricatorData.filter(fabricator => fabricator.id !== action.payload);
    },
  },
});

export const { addFabricator, showFabricator, deleteFabricator, addClient } = fabricatorSlice.actions;

export default fabricatorSlice.reducer;
