import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectData: [
    {
      id:1,
      name: 'Project 1',
      description:'Project Description 1',
      estimatedHours: 100,
      status:'ASSIGNED',
      stage:'(IFA)Issue For Approval',
      tools:'TEKLA',
      start_date:'2021-07-01',
      approval_date:'2021-12-31',
      department:'Tekla',
      manager:'LCS',
      team:'Team-1',
      fabricator:'Fabricator-1'
    },
    {
      id:2,
      name: 'Project 2',
      description:'Project Description 2',
      estimatedHours: 100,
      status:'ACTIVE',
      stage:'(IFA)Issue For Approval',
      tools:'TEKLA',
      start_date:'2021-07-01',
      approval_date:'2021-12-31',
      department:'Tekla',
      manager:'LCS',
      team:'Team-2',
      fabricator:'Fabricator-1'
    },
    {
      id:3,
      name: 'Project 3',
      description:'Project Description 3',
      estimatedHours: 100,
      status:'ACTIVE',
      stage:'(IFA)Issue For Approval',
      tools:'TEKLA',
      start_date:'2021-07-01',
      approval_date:'2021-12-31',
      department:'Tekla',
      manager:'LCS',
      team:'Team-1',
      fabricator:'Fabricator-1'
    },
    {
      id:4,
      name: 'Project 4',
      description:'Project Description 4',
      estimatedHours: 100,
      status:'COMPLETED',
      stage:'(IFA)Issue For Approval',
      tools:'TEKLA',
      start_date:'2021-07-01',
      approval_date:'2021-12-31',
      department:'Tekla',
      manager:'LCS',
      team:'Team-1',
      fabricator:'Fabricator-2'
    },
  ],
  rfiData: [],
  submittalData:[]
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
