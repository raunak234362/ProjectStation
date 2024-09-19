import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectData: [],
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
  },
});

export const { addProject, showProjects, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
