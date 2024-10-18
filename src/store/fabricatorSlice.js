import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fabricatorData: [
    {
      id: 1,
      name: "Fabricator-1",
      address: "123 Main St, Industrial Zone",
      country: "US",
      state: "Alabama",
      city: "Alexander City",
      zip_code: 45122,
      branch: [
        { address: "Alexander City" },
        { address: "NewJersey" },
        { address: "Alabama" },
      ],
      website: "https://dribbble.com/",
      drive: "https://drive.google.com/drive/folders/sample1",
    },
    {
      id: 2,
      name: "Fabricator-2",
      address: "456 Maple St, Industrial Area",
      country: "US",
      state: "California",
      city: "Los Angeles",
      zip_code: 90001,
      branch: [
        { address: "Alexander City" },
        { address: "Washington" },
        { address: "Berlin" },
      ],
      website: "https://behance.net/",
      drive: "https://drive.google.com/drive/folders/sample2",
    },
    {
      id: 3,
      name: "Fabricator-3",
      address: "789 Oak St, Commercial Hub",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      zip_code: 10001,
      branch: [
        { address: "Tokyo" },
        { address: "NewJersey" },
        { address: "Alabama" },
      ],
      website: "https://example.com/",
      drive: "https://drive.google.com/drive/folders/sample3",
    },
  ],
  clientData: [
    {
      id: 1,
      f_name: "Client-1",
      designation:'Manager',
      email:'client1@gmail.com',
      phone:7878452112,
      landline:+785545454,
      fabricator: {
        id: 1,
        name: "Fabricator-1",
        address: "123 Main St, Industrial Zone",
        country: "US",
        state: "Alabama",
        city: "Alexander City",
        zip_code: 10001,
      },
    },
    {
      id: 2,
      f_name: "Client-2",
      designation:'Manager',
      email:'client2@gmail.com',
      phone:7878452112,
      landline:+785545454,
      fabricator: {
        id: 1,
        name: "Fabricator-1",
        address: "123 Main St, Industrial Zone",
        country: "US",
        state: "Alabama",
        city: "Alexander City",
        zip_code: 10001,
      },
    },
    {
      id: 3,
      f_name: "Client-3",
      designation:'Manager',
      email:'client3@gmail.com',
      phone:7878452112,
      landline:+785545454,
      fabricator: {
        id: 2,
        name: "Fabricator-2",
        address: "562 Main St, Tech Zone",
        country: "US",
        state: "Alaska",
        city: "Georgia",
        zip_code: 12454,
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
  deleteFabricator,
  addClient,
  showClient,
} = fabricatorSlice.actions;

export default fabricatorSlice.reducer;
