import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import projectReducer from './projectSlice'
import fabricatorReducer from './fabricatorSlice'
const store= configureStore({
    reducer:{
        userData : userReducer,
        projectData: projectReducer,
        fabricatorData: fabricatorReducer
    }
})

export default store;