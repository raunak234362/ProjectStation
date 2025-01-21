import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: [],
  rfiData: [],
  submittals: [
    {
      id: 1,
      email: "client1@gmail.com",
      f_name: "Client 1",
      remarks: "RFI Remarks 1",
      description: "Descriptions 1",
      date: "20/12/2024",
      status: "OPEN",
      file: "file-1",

      fabricator: {
        name: "Fabricator-1",
        branch: {
          address: "ABC Washington",
          city: "Washington",
          state: "DC",
          country: "US",
          client: {
            f_name: "Client-1",
            email: "client1@gmail.com",
            phone: "1234567890",
            landline: "1234567890",
            alt_number: "1234567890",
          },
        },
        project: {
          name: "Project 1",
          description: "Project Description 1",
          estimatedHours: 100,
          status: "ASSIGNED",
          tools: "TEKLA",
          start_date: "2021-07-01",
          approval_date: "2021-12-31",
          department: "Tekla",
          manager: "LCS",
          team: "Team-1",
        },
      },
    },
    {
      id: 2,
      email: "client2@gmail.com",
      f_name: "Client 2",
      remarks: "RFI Remarks 2",
      description: "Descriptions 1",
      date: "20/12/2024",
      status: "OPEN",
      file: "file-1",

      fabricator: {
        name: "Fabricator-1",
        branch: {
          address: "ABC Washington",
          city: "Washington",
          state: "DC",
          country: "US",
          client: {
            f_name: "Client-1",
            email: "client1@gmail.com",
            phone: "1234567890",
            landline: "1234567890",
            alt_number: "1234567890",
          },
        },
        project: {
          name: "Project 1",
          description: "Project Description 1",
          estimatedHours: 100,
          status: "ASSIGNED",
          tools: "TEKLA",
          start_date: "2021-07-01",
          approval_date: "2021-12-31",
          department: "Tekla",
          manager: "LCS",
          team: "Team-1",
        },
      },
    },
    {
      id: 3,
      email: "client1@gmail.com",
      description: "Descriptions 1",
      f_name: "Client 1",
      remarks: "RFI Remarks 1",
      date: "20/12/2024",
      status: "OPEN",
      file: "file-1",

      fabricator: {
        name: "Fabricator-2",
        branch: {
          address: "ABC Washington",
          city: "Washington",
          state: "DC",
          country: "US",
          client: {
            f_name: "Client-1",
            email: "client1@gmail.com",
            phone: "1234567890",
            landline: "1234567890",
            alt_number: "1234567890",
          },
        },
        project: {
          name: "Project 2",
          description: "Project Description 1",
          estimatedHours: 100,
          status: "ASSIGNED",
          tools: "TEKLA",
          start_date: "2021-07-01",
          approval_date: "2021-12-31",
          department: "Tekla",
          manager: "LCS",
          team: "Team-1",
        },
      },
    },
    {
      id: 4,
      email: "client2@gmail.com",
      f_name: "Client 2",
      remarks: "RFI Remarks 3",
      description: "Descriptions 1",
      date: "20/12/2024",
      status: "OPEN",
      file: "file-1",

      fabricator: {
        name: "Fabricator-1",
        branch: {
          address: "ABC Washington",
          city: "Washington",
          state: "DC",
          country: "US",
          client: {
            f_name: "Client-1",
            email: "client1@gmail.com",
            phone: "1234567890",
            landline: "1234567890",
            alt_number: "1234567890",
          },
        },
      },
      project: {
        name: "Project 1",
        description: "Project Description 1",
        estimatedHours: 100,
        status: "ASSIGNED",
        tools: "TEKLA",
        start_date: "2021-07-01",
        approval_date: "2021-12-31",
        department: "Tekla",
        manager: "LCS",
        team: "Team-1",
      },
    },
  ],
  changeOrder: [],
  workBreakdown: [
    {
      id: 1,
      taskName: "MODELING",
      task: [
        {
          id: 1,
          name: "Grid Placement",
        },
        {
          id: 2,
          name: "MP - Wall & Panel Placement",
        },
        {
          id: 3,
          name: "MP - Column Placement",
        },
        {
          id: 4,
          name: "Base Plate",
        },
        {
          id: 5,
          name: "MP - Beam Placement",
        },
        {
          id: 6,
          name: "MP - Material Attachment",
        },
        {
          id: 7,
          name: "MP - Joist Placement",
        },
        {
          id: 8,
          name: "MP - Lintel",
        },
        {
          id: 9,
          name: "MP - Embed Placement",
        },
        {
          id: 10,
          name: "MP - Girt & Purlin Placement",
        },
        {
          id: 11,
          name: "MP - Jamb & Header Placement",
        },
        {
          id: 12,
          name: "MP - Brace Placement",
        },
        {
          id: 13,
          name: "MP - Truss Placement",
        },
        {
          id: 14,
          name: "MP - Sag Rod Placement",
        },
        {
          id: 15,
          name: "MP - Grating & Checkered Plate Placement",
        },
        {
          id: 16,
          name: "MP- Misc",
        },
        {
          id: 17,
          name: "MP - Stair Placement & Connection",
        },
        {
          id: 18,
          name: "MP - Ladder Placement & Connection",
        },
        {
          id: 19,
          name: "MP - Hand Rail Placement & Connection",
        },
        {
          id: 20,
          name: "RTU & Opening Frame Placement & Connection",
        },
        {
          id: 21,
          name: "Connection of Column",
        },
        {
          id: 22,
          name: "Connection of Beam",
        },
        {
          id: 23,
          name: "Connection of Jamb & Header",
        },
        {
          id: 24,
          name: "Connection of Brace",
        },
        {
          id: 25,
          name: "Connection of Truss",
        },
        {
          id: 26,
          name: "Connection of Girt & Purlin",
        },
        {
          id: 27,
          name: "Connection of Joist",
        },
      ],
    },
    {
      id: 2,
      taskName: "ERECTION",
      task: [
        {
          id: 1,
          name: "Erection of AB Plans",
        },
        {
          id: 2,
          name: "Erection of Embed Plans",
        },
        {
          id: 3,
          name: "Erection of Embed Sections",
        },
        {
          id: 4,
          name: "Erection of Main Steel Plans",
        },
        {
          id: 5,
          name: "Erection of Main Steel Elevations",
        },
        {
          id: 6,
          name: "Erection of Main Steel Sections",
        },
        {
          id: 7,
          name: "Erection of Misc Steel Plans",
        },
        {
          id: 8,
          name: "Erection of Misc Steel Elevations",
        },
        {
          id: 9,
          name: "Erection of Misc Steel Sections",
        },
      ],
    },
    {
      id: 3,
      taskName: "DETAILING",
      task: [
        {
          id: 1,
          name: "Detailing of AB Plans",
        },
        {
          id: 2,
          name: "Embed Detailing",
        },
        {
          id: 3,
          name: "Main Steel Sheet loading",
        },
        {
          id: 4,
          name: "Column Detailing",
        },
        {
          id: 5,
          name: "Beam Detailing",
        },
        {
          id: 6,
          name: "Lintel Detailing",
        },
        {
          id: 7,
          name: "Jamb",
        },
        {
          id: 8,
          name: "Header",
        },
        {
          id: 9,
          name: "Horizontal Brace",
        },
        {
          id: 10,
          name: "Vertical Brace",
        },
        {
          id: 11,
          name: "Girt",
        },
        {
          id: 12,
          name: "Sag Rod",
        },
        {
          id: 13,
          name: "Misc Sheet Loading",
        },
        {
          id: 14,
          name: "Plate/ Grating",
        },
        {
          id: 15,
          name: "Pour Stop (Loose)",
        },
        {
          id: 16,
          name: "Kicker",
        },
        {
          id: 17,
          name: "Loose Plate",
        },
        {
          id: 18,
          name: "Deck Support Angle",
        },
        {
          id: 19,
          name: "Loose Lintel",
        },
        {
          id: 20,
          name: "Gates",
        },
        {
          id: 21,
          name: "Stair",
        },
        {
          id: 22,
          name: "Spiral Stair",
        },
        {
          id: 23,
          name: "Ladder",
        },
        {
          id: 24,
          name: "Hand Rail",
        },
        {
          id: 25,
          name: "RTU & opening Frame",
        },
        {
          id: 26,
          name: "Bollards",
        },
        {
          id: 27,
          name: "Plate/ Grating",
        },
        {
          id: 28,
          name: "Plate/ Grating",
        },
        {
          id: 29,
          name: "Plate/ Grating",
        },
        {
          id: 30,
          name: "Plate/ Grating",
        },
        {
          id: 31,
          name: "Detailing of AB Plans",
        },
      ],
    },
  ],
};

const projectSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projectData.push(action.payload);
      localStorage.setItem("projectData", JSON.stringify(state.projectData));
    },
    showProjects: (state, action) => {
      state.projectData = action.payload;
    },
    updateProjectData: (state, action) => {
      state.projectData = state.projectData.map((project) =>
        project.id === action.payload.id
          ? { ...project, ...action.payload }
          : project
      );
    },
    deleteProject: (state, action) => {
      state.projectData = state.projectData.filter(
        (project) => project.id !== action.payload
      );
    },
    addCO: (state, action) => {
      state.changeOrder.push(action.payload);
      localStorage.setItem("changeOrder", JSON.stringify(state.changeOrder));
    },
    showCO: (state, action) => {
      state.changeOrder = action.payload;
    },
    deleteCO: (state, action) => {
      state.changeOrder = state.changeOrder.filter(
        (changeOrder) => changeOrder.id !== action.payload
      );
    },
    addRFI: (state, action) => {
      state.rfiData.push(action.payload);
      localStorage.setItem("rfiData", JSON.stringify(state.rfiData));
    },
    showRFIs: (state, action) => {
      state.rfiData = action.payload;
    },
    deleteRFI: (state, action) => {
      state.rfiData = state.rfiData.filter((rfi) => rfi.id !== action.payload);
    },
  },
});

export const {
  addProject,
  showProjects,
  updateProjectData,
  deleteProject,
  addCO,
  showCO,
  deleteCO,
  addRFI,
  showRFIs,
  deleteRFI,
} = projectSlice.actions;

export default projectSlice.reducer;
