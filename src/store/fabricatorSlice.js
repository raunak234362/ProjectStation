import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fabricatorData: [],
  clientData: [],
}


const fabricatorSlice = createSlice({
  name: 'fabricatorData',
  initialState,
  reducers: {
    loadFabricator: (state, action) => {
      state.fabricatorData = action.payload
    },
    addFabricator: (state, action) => {
      state.fabricatorData.push(action.payload)
    },
    addClient: (state, action) => {
      state.clientData.push(action.payload)
    },
    showClient: (state, action) => {
      state.clientData = action.payload
    },
    deleteFabricator: (state, action) => {
      state.fabricatorData = state.fabricatorData.filter(
        (fabricator) => fabricator.id !== action.payload,
      )
    },
  },
})

export const {
  addFabricator,
  loadFabricator,
  deleteFabricator,
  addClient,
  showClient,
} = fabricatorSlice.actions

export default fabricatorSlice.reducer
