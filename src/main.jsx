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
} from './components/index.js'



// Define the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginContent />,
    // children: [{ index: true, element: <LoginContent /> }],
  },
  {
    path: '/dashboard',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <MainContent />,
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
    ],
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
