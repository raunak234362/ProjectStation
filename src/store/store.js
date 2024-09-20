import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import projectReducer from './projectSlice'
import fabricatorReducer from './fabricatorSlice'
import vendorReducer from './vendorSlice'
const store= configureStore({
    reducer:{
        userData : userReducer,
        projectData: projectReducer,
        fabricatorData: fabricatorReducer,
        vendorData: vendorReducer
    }
})

export default store;