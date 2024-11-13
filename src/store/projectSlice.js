import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: [
    {
      id: 1,
      name: "Project 1",
      description: "Project Description 1",
      estimatedHours: 100,
      status: "ASSIGNED",
      stage: "(IFA)Issue For Approval",
      tools: "TEKLA",
      start_date: "2021-07-01",
      approval_date: "2021-12-31",
      department: "Tekla",
      manager: "LCS",
      team: "Team-1",
      fabricator: "Fabricator-1",
    },
    {
      id: 2,
      name: "Project 2",
      description: "Project Description 2",
      estimatedHours: 100,
      status: "ACTIVE",
      stage: "(IFA)Issue For Approval",
      tools: "TEKLA",
      start_date: "2021-07-01",
      approval_date: "2021-12-31",
      department: "Tekla",
      manager: "LCS",
      team: "Team-2",
      fabricator: "Fabricator-1",
    },
    {
      id: 3,
      name: "Project 3",
      description: "Project Description 3",
      estimatedHours: 100,
      status: "ACTIVE",
      stage: "(IFA)Issue For Approval",
      tools: "TEKLA",
      start_date: "2021-07-01",
      approval_date: "2021-12-31",
      department: "Tekla",
      manager: "LCS",
      team: "Team-1",
      fabricator: "Fabricator-1",
    },
    {
      id: 4,
      name: "Project 4",
      description: "Project Description 4",
      estimatedHours: 100,
      status: "COMPLETED",
      stage: "(IFA)Issue For Approval",
      tools: "TEKLA",
      start_date: "2021-07-01",
      approval_date: "2021-12-31",
      department: "Tekla",
      manager: "LCS",
      team: "Team-1",
      fabricator: "Fabricator-2",
    },
  ],
  rfiData: [
    {
      id: 1,
      email: "client1@gmail.com",
      f_name: "Client 1",
      remarks: "RFI Remarks 1",
      description:'Descriptions 1',
      date: "20/12/2024",
      status: "OPEN",
      file: 'file-1',

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
      description:'Descriptions 1',
      date: "20/12/2024",
      status: "OPEN",
      file: 'file-1',

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
      description:'Descriptions 1',
      f_name: "Client 1",
      remarks: "RFI Remarks 1",
      date: "20/12/2024",
      status: "OPEN",
      file: 'file-1',

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
      description:'Descriptions 1',
      date: "20/12/2024",
      status: "OPEN",
      file: 'file-1',

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
  submittalData: [],
  workBreakdown: [
    {
      "id":1,
      "taskName" : "MODELING",
      "task":[
          {
              "id" : 1,
              "name" : "Grid Placement",
              "subTask" : []
          },
          {
              "id" : 2,
              "name" : "MP - Wall & Panel Placement",
              "subTask" : []
          },
          {
              "id" : 3,
              "name" : "MP - Column Placement",
              "subTask" : []
          },
          {
              "id" : 4,
              "name" : "Base Plate",
              "subTask" : []
          },
          {
              "id" : 5,
              "name" : "MP - Beam Placement",
              "subTask" : []
          },
          {
              "id" : 6,
              "name" : "MP - Material Attachment",
              "subTask" : []
          },
          {
              "id" : 7,
              "name" : "MP - Joist Placement",
              "subTask" : []
          },
          {
              "id" : 8,
              "name" : "MP - Lintel",
              "subTask" : []
          },
          {
              "id" : 9,
              "name" : "MP - Embed Placement",
              "subTask" : []
          },
          {
              "id" : 10,
              "name" : "MP - Girt & Purlin Placement",
              "subTask" : []
          },
          {
              "id" : 11,
              "name" : "MP - Jamb & Header Placement",
              "subTask" : []
          },
          {
              "id" : 12,
              "name" : "MP - Brace Placement",
              "subTask" : []
          },
          {
              "id" : 13,
              "name" : "MP - Truss Placement",
              "subTask" : []
          },
          {
              "id" : 14,
              "name" : "MP - Sag Rod Placement",
              "subTask" : []
          },
          {
              "id" : 15,
              "name" : "MP - Grating & Checkered Plate Placement",
              "subTask" : []
          },
          {
              "id" : 16,
              "name" : "MP- Misc",
              "subTask" : []
          },
          {
              "id" : 17,
              "name" : "MP - Stair Placement & Connection",
              "subTask" : []
          },
          {
              "id" : 18,
              "name" : "MP - Ladder Placement & Connection",
              "subTask" : []
          },
          {
              "id" : 19,
              "name" : "MP - Hand Rail Placement & Connection",
              "subTask" : []
          },
          {
              "id" : 20,
              "name" : "RTU & Opening Frame Placement & Connection",
              "subTask" : []
          },
          {
              "id" : 21,
              "name" : "Connection of Column",
              "subTask" : []
          },
          {
              "id" : 22,
              "name" : "Connection of Beam",
              "subTask" : []
          },
          {
              "id" : 23,
              "name" : "Connection of Jamb & Header",
              "subTask" : []
          },
          {
              "id" : 24,
              "name" : "Connection of Brace",
              "subTask" : []
          },
          {
              "id" : 25,
              "name" : "Connection of Truss",
              "subTask" : []
          },
          {
              "id" : 26,
              "name" : "Connection of Girt & Purlin",
              "subTask" : []
          },
          {
              "id" : 27,
              "name" : "Connection of Joist",
              "subTask" : []
          }
      ]
  },
  {
      "id":2,
      "taskName" : "ERECTION",
      "task" : [
          {
              "id":1,
              "name" : "Erection of AB Plans",
              "subTask" : []
          },
          {
              "id":2,
              "name" : "Erection of Embed Plans",
              "subTask" : []
          },
          {
              "id":3,
              "name" : "Erection of Embed Sections",
              "subTask" : []
          },
          {
              "id":4,
              "name" : "Erection of Main Steel Plans",
              "subTask" : []
          },
          {
              "id":5,
              "name" : "Erection of Main Steel Elevations",
              "subTask" : []
          },
          {
              "id":6,
              "name" : "Erection of Main Steel Sections",
              "subTask" : []
          },
          {
              "id" : 7,
              "name" : "Erection of Misc Steel Plans",
              "subTask" : []
          },
          {
              "id" : 8,
              "name" : "Erection of Misc Steel Elevations",
              "subTask" : []
          },
          {
              "id" : 9,
              "name" : "Erection of Misc Steel Sections",
              "subTask" : []
          }
      ]
  },
  {
      "id":3,
      "taskName" : "DETAILING",
      "task" : [
          {
              "id":1,
              "name" : "Detailing of AB Plans",
              "subTask" : []
          },
          {
              "id":2,
              "name" : "Embed Detailing",
              "subTask" : []
          },
          {
              "id":3,
              "name" : "Main Steel Sheet loading",
              "subTask" : []
          },
          {
              "id":4,
              "name" : "Column Detailing",
              "subTask" : []
          },
          {
              "id":5,
              "name" : "Beam Detailing",
              "subTask" : []
          },
          {
              "id" : 6,
              "name" : "Lintel Detailing",
              "subTask" : []
          },
          {
              "id" : 7,
              "name" : "Jamb",
              "subTask" : []
          },
          {
              "id" : 8,
              "name" : "Header",
              "subTask" : []
          },
          {
              "id" : 9,
              "name" : "Horizontal Brace",
              "subTask" : []
          },
          {
              "id" : 10,
              "name" : "Vertical Brace",
              "subTask" : []
          },
          {
              "id" : 11,
              "name" : "Girt",
              "subTask" : []
          },
          {
              "id" : 12,
              "name" : "Sag Rod",
              "subTask" : []
          },
          {
              "id" : 13,
              "name" : "Misc Sheet Loading",
              "subTask" : []
          },
          {
              "id":14,
              "name" : "Plate/ Grating",
              "subTask" : []
          },
          {
              "id":15,
              "name" : "Pour Stop (Loose)",
              "subTask" : []
          },
          {
              "id":16,
              "name" : "Kicker",
              "subTask" : []
          },
          {
              "id":17,
              "name" : "Loose Plate",
              "subTask" : []
          },
          {
              "id":18,
              "name" : "Deck Support Angle",
              "subTask" : []
          },
          {
              "id":19,
              "name" : "Loose Lintel",
              "subTask" : []
          },
          {
              "id":20,
              "name" : "Gates",
              "subTask" : []
          },
          {
              "id":21,
              "name" : "Stair",
              "subTask" : []
          },
          {
              "id":22,
              "name" : "Spiral Stair",
              "subTask" : []
          },
          {
              "id":23,
              "name" : "Ladder",
              "subTask" : []
          },
          {
              "id":24,
              "name" : "Hand Rail",
              "subTask" : []
          },
          {
              "id":25,
              "name" : "RTU & opening Frame",
              "subTask" : []
          },
          {
              "id":26,
              "name" : "Bollards",
              "subTask" : []
          },
          {
              "id":27,
              "name" : "Plate/ Grating",
              "subTask" : []
          },
          {
              "id":28,
              "name" : "Plate/ Grating",
              "subTask" : []
          },
          {
              "id":29,
              "name" : "Plate/ Grating",
              "subTask" : []
          },
          {
              "id":30,
              "name" : "Plate/ Grating",
              "subTask" : []
          },
          {
              "id":31,
              "name" : "Detailing of AB Plans",
              "subTask" : []
          }
      ]
  }
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
    deleteProject: (state, action) => {
      state.projectData = state.projectData.filter(
        (project) => project.id !== action.payload
      );
    },
    addCO:(state, action)=>{
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
  deleteProject,
  addCO,
  showCO,
  deleteCO,
  addRFI,
  showRFIs,
  deleteRFI,
} = projectSlice.actions;

export default projectSlice.reducer;
