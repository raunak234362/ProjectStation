import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginContent from './view/login/LoginContent.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {
  AddFabricator,
  AddFabricatorUser,
  AddProject,
  AllClients,
  AllFabricator,
  AllProject,
  EditProject,
  ErrorBoundary,
  Fabricators,
  MainContent,
  Projects,
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
      }
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
