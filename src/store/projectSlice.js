import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectData:null
}

const projectSlice = createSlice({
    name:'projectData',
    initialState,
    reducers:{
        addProject:(state,action)=>{
            state.projectData = action.payload;
            localStorage.setItem('projectData', JSON.stringify(action.payload));
        }
    }
})
export const {addProject}=projectSlice.actions

export default projectSlice.reducer