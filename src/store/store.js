import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import projectReducer from './projectSlice'

const store= configureStore({
    reducer:{
        userData : userReducer,
        projectData: projectReducer
    }
})

export default store;