import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectData: [],
  rfiData: []
};

const projectSlice = createSlice({
  name: 'projectData',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projectData.push(action.payload);
      localStorage.setItem('projectData', JSON.stringify(state.projectData));
    },
    showProjects: (state, action) => {
      state.projectData = action.payload;
    },
    deleteProject: (state, action) => {
      state.projectData = state.projectData.filter(project => project.id !== action.payload);
    },
    addRFI: (state, action) => {
      state.rfiData.push(action.payload);
      localStorage.setItem('rfiData', JSON.stringify(state.rfiData));
    },
    showRFIs: (state, action) => {
      state.rfiData = action.payload;
    },
    deleteRFI: (state, action) => {
      state.rfiData = state.rfiData.filter(rfi => rfi.id !== action.payload);
    },
  },
});

export const { addProject, showProjects, deleteProject,addRFI,showRFIs,deleteRFI } = projectSlice.actions;

export default projectSlice.reducer;
