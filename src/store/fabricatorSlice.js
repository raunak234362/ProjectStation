import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fabricatorData: []
}

const fabricatorSlice = createSlice({
    name: 'fabricatorData',
    initialState,
    reducers: {
        addFabricator: (state, action) => {
            state.fabricatorData.push(action.payload);
            localStorage.setItem('fabricatorData', JSON.stringify(state.fabricatorData));
        },
        showFabricator: (state, action) => {
            state.fabricatorData = action.payload;
        },
        deleteFabricator: (state, action) => {
            state.fabricatorData = state.fabricatorData.filter(fabricator => fabricator.id !== action.payload);
        },
    }
});

export const { addFabricator, showFabricator, deleteFabricator } = fabricatorSlice.actions;
export default fabricatorSlice.reducer;