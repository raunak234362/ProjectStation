import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendorData: [
    {
      id: 1,
      name: "Vendor 1",
      address: "Vendor 1 Address",
      country: "Vendor 1 Country",
      state: "Vendor 1 State",
      city: "Vendor 1 City",
      branch: [{ address: "address branch 1" }],
      zip_code: "Vendor 1 ZipCode",
    },
    {
      id: 2,
      name: "Vendor 2",
      address: "Vendor 2 Address",
      country: "Vendor 2 Country",
      state: "Vendor 2 State",
      city: "Vendor 2 City",
      branch: [
        { address: "address branch 1" },
        { address: "address branch 2" },
        { address: "address branch 3" },
      ],
      zip_code: "Vendor 2 ZipCode",
    },
    {
      id: 3,
      name: "Vendor 3",
      address: "Vendor 3 Address",
      country: "Vendor 3 Country",
      state: "Vendor 3 State",
      city: "Vendor 3 City",
      zip_code: "Vendor 3 ZipCode",
    },
    {
      id: 4,
      name: "Vendor 4",
      address: "Vendor 4 Address",
      country: "Vendor 4 Country",
      state: "Vendor 4 State",
      city: "Vendor 4 City",
      branch: [
        { address: "address branch 1" },
        { address: "address branch 2" },
        { address: "address branch 3" },
      ],
      zip_code: "Vendor 4 ZipCode",
    },
  ],
  vendorUserData: [
    {
      id: 1,
      username: "Vendor1",
      designation: "Manager",
      f_name: "Vendor1",
      email: "vendor1@gmail.com",
      phone: "1234567890",
      vendor: {
        id: 1,
        name: "Vendor 1",
        address: "Vendor 1 Address",
        country: "Vendor 1 Country",
        state: "Vendor 1 State",
        city: "Vendor 1 City",
        branch: [{ address: "address branch 1" }],
        zip_code: "Vendor 1 ZipCode",
      },
    },
    {
      id: 2,
      username: "Vendor2",
      designation: "Manager",
      f_name: "Vendor2",
      email: "vendor2@gmail.com",
      phone: "1234567890",
      branch: [
        { address: "address branch 1" },
      ],
      vendor: {
        id: 2,
        name: "Vendor 2",
        address: "Vendor 2 Address",
        country: "Alaska 2 Country",
        state: "Vendor 2 State",
        city: "Vendor 2 City",
        zip_code: "Vendor 2 ZipCode",
      },
    },
  ],
};

const vendorSlice = createSlice({
  name: "vendorData",
  initialState,
  reducers: {
    loadVendor: (state, action) => {
      state.vendorData = action.payload;
    },
    addVendor: (state, action) => {
      state.vendorData.push(action.payload);
    },
    deleteVendor: (state, action) => {
      state.vendorData = state.vendorData.filter(
        (vendor) => vendor.id !== action.payload
      );
    },
    loadVendorUser: (state, action) => {
      state.vendorUserData = action.payload;
    },
    addVendorUser: (state, action) => {
      state.vendorUserData.push(action.payload);
    },
    deleteVendorUser: (state, action) => {
      state.vendorUserData = state.vendorUserData.filter(
        (vendor) => vendor.id !== action.payload
      );
    },
  },
});

export const {
  addVendor,
  loadVendor,
  deleteVendor,
  loadVendorUser,
  addVendorUser,
  deleteVendorUser,
} = vendorSlice.actions;

export default vendorSlice.reducer;
