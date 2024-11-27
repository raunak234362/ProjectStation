/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginContent from './view/login/LoginContent.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {
  AddEmployee,
  AddFabricator,
  AddFabricatorUser,
  AddProject,
  AddVendor,
  AllClients,
  AllEmployees,
  AllFabricator,
  AllProject,
  EditProject,
  ErrorBoundary,
  Fabricators,
  MainContent,
  ManageTeam,
  Projects,
  Vendor,
  AllVendors,
  AllDepartment,
  AddDepartment,
  ChangePassword,
  AllVendorUser,
  AddVendorUser,
  RFI,
  CreateRFI,
  AllSentRFI,
  AllReceivedRFI,
  Submittals,
  SendSubmittals,
  AllReceivedSubmittals,
  AllSubmittals,
  GetFabricator,
  GetClient,
  CO,
  SendCO,
  AllReceivedCO,
  AllSentCO,
  Dashboard,
} from './components/index.js'

import {Dashboard as ClientDashboard,
  Profile as ClientProfile,
  Project as ClientProject,
  RFI as ClientRFI,
  Submittals as ClientSubmittals,
  ChangeOrder as ClientCO,
  Team as ClientTeam,
} from './components/dashboard/client/clientIndex.js'


// Define the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginContent />,
    // children: [{ index: true, element: <LoginContent /> }],
  },
  {
    path: '/change-password/',
    element: <ChangePassword />,
  },
  // {
  //   path:'dashboard/fabricator/:id',
  //   element:<GetFabricator/>
  // },
  // {
  //   path:'dashboard/client/:id',
  //   element:<GetClient/>
  // },
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'profile',
        element: <MainContent />,
      },
      {
        path: 'dashboard',
        element:<Dashboard/>,
      },
      {
        path: 'project',
        element: <Projects />,
        children: [
          { path: 'add-project', element: <AddProject /> },
          { path: 'all-projects', element: <AllProject /> },
          { path: 'edit-project', element: <EditProject /> },
        ],
      }, 
      {
        path:'fabricator',
        element: <Fabricators />,
        children: [
          { path: 'add-fabricator', element: <AddFabricator /> },
          { path: 'all-fabricator', element: <AllFabricator /> },
          { path: 'all-clients', element: <AllClients /> },
          { path: 'add-client', element: <AddFabricatorUser /> },
        ]
      },
      {
        path:'vendor',
        element:<Vendor/>,
        children: [
          { path: 'add-vendor', element:<AddVendor/> },
          { path: 'all-vendors', element:<AllVendors/> },
          { path: 'all-vendor-user', element:<AllVendorUser/> },
          { path: 'add-vendor-user', element:<AddVendorUser/> },
        ]
      },
      {
        path:'team',
        element: <ManageTeam />,
        children: [
          { path: 'add-employee', element: <AddEmployee /> },
          { path: 'all-employees', element: <AllEmployees /> },
          { path: 'all-department', element: <AllDepartment /> },
          { path: 'add-department', element: <AddDepartment /> },
        ]
      },
      {
        path:'rfi',
        element:<RFI/>,
        children: [
          { path: 'create-rfi', element:<CreateRFI/> },
          { path: 'all-sent-rfi', element:<AllSentRFI/> },
          { path: 'all-received-rfi', element:<AllReceivedRFI/> },
        ]
      },
      {
        path:'submittals',
        element:<Submittals/>,
        children: [
          { path: 'send-submittals', element:<SendSubmittals/> },
          { path: 'all-received-submittals', element:<AllReceivedSubmittals/> },
          { path: 'all-submittals', element:<AllSubmittals/> },
        ]
        
      },
      {
        path:'change-order',
        element:<CO/>,
        children: [
          {path:'send-co', element:<SendCO/>},
          {path:'all-received-co', element:<AllReceivedCO/>},
          {path:'all-sent-co',element:<AllSentCO/>}
        ]
      },
    ],
  },
  {
    path:'/client',
    element:<App/>,
    children:[
      {
        path:'profile',
        element:<ClientProfile/>,
      },
      {
        path:'dashboard',
        element:<ClientDashboard/>
      },
      {
        path:'project',
        element:<ClientProject/>
      },
      {
        path:'rfi',
        element:<ClientRFI/>,
      },
      {
        path:'submittals',
        element:<ClientSubmittals/>,
      },
      {
        path:'change-order',
        element:<ClientCO/>,
      },
      {
        path:'team',
        element:<ClientTeam/>,
      }
    ]
  },
 
  { path: '*', element: <ErrorBoundary /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
