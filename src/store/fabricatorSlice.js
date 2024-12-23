import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fabricatorData: [],
  clientData: [
    {
      id: 1,
      f_name: "Client-1",
      designation: "Manager",
      email: "client1@gmail.com",
      phone: 7878452112,
      landline: +785545454,
      fabricator: {
        id: 1,
        name: "Fabricator-1",
        headquater: {
          address: "123 Main St, Industrial Zone",
          country: "US",
          state: "Alabama",
          city: "Alexander City",
          zip_code: 10001,
        },
        branch: [],
      },
    },
    {
      id: 2,
      f_name: "Client-2",
      designation: "Manager",
      email: "client2@gmail.com",
      phone: 7878452112,
      landline: +785545454,
      fabricator: {
        id: 1,
        name: "Fabricator-1",
        headquater: {
          address: "123 Main St, Industrial Zone",
          country: "US",
          state: "Alabama",
          city: "Alexander City",
          zip_code: 10001,
        },
        branch: [],
      },
    },
    {
      id: 3,
      f_name: "Client-3",
      designation: "Manager",
      email: "client3@gmail.com",
      phone: 7878452112,
      landline: +785545454,
      fabricator: {
        id: 2,
        name: "Fabricator-2",
        headquater: {
          address: "562 Main St, Tech Zone",
          country: "US",
          state: "Alaska",
          city: "Georgia",
          zip_code: 12454,
        },
        branch: [],
      },
    },
  ],
};

const fabricatorSlice = createSlice({
  name: "fabricatorData",
  initialState,
  reducers: {
    loadFabricator: (state, action) => {
      state.fabricatorData = action.payload;
    },
    addFabricator: (state, action) => {
      state.fabricatorData.push(action.payload);
    },
    updateFabricator(state, action) {
      const updatedFabricator = action.payload;
      state.fabricatorData = state.fabricatorData.map((fabricator) =>
        fabricator.id === updatedFabricator.id ? updatedFabricator : fabricator
      );
    },
    addBranchToFabricator(state, action) {
      const { fabricatorId, branchData } = action.payload;

      state.fabricatorData = state.fabricatorData.map((fabricator) =>
        fabricator.id === fabricatorId
          ? {
              ...fabricator,
              branch: fabricator.branch
                ? [...fabricator.branch, branchData]
                : [branchData],
            }
          : fabricator
      );
    },
    updateFabricatorBranch(state, action) {
      const { fabricatorId, branchData } = action.payload;

      state.fabricatorData = state.fabricatorData.map((fabricator) =>
        fabricator.id === fabricatorId
          ? {
              ...fabricator,
              branch: fabricator.branch
                ? [...fabricator.branch, branchData]
                : [branchData],
            }
          : fabricator
      );
    },
    addClient: (state, action) => {
      state.clientData.push(action.payload);
    },
    showClient: (state, action) => {
      state.clientData = action.payload;
    },
    deleteFabricator: (state, action) => {
      state.fabricatorData = state.fabricatorData.filter(
        (fabricator) => fabricator.id !== action.payload
      );
    },
  },
});

export const {
  addFabricator,
  loadFabricator,
  updateFabricator,
  addBranchToFabricator,
  updateFabricatorBranch,
  deleteFabricator,
  addClient,
  showClient,
} = fabricatorSlice.actions;

export default fabricatorSlice.reducer;
