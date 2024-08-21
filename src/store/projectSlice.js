import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const projectSlice = createSlice({
    name:'projectData',
    initialState,
    reducers:{
        addProject:(state,action)=>{
            state.projectData = action.payload
        }
    }
})


export default projectSlice.reducer