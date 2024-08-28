import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginContent from './view/login/LoginContent.jsx'
import Dashboard from './view/home/Dashboard.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { AddProject, EditProject, ErrorBoundary, MainContent, Projects } from './components/index.js'

// Define the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The main App component
    children: [
      { index: true, element: <LoginContent /> }, 
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            index: true, 
            element: <MainContent />,
          },
          {
            path: 'project',
            element: <Projects />,
            children: [
              // { index: true, element: <Projects /> }, 
              { path: 'add-project', element: <AddProject /> },
              { path: 'edit-project', element: <EditProject /> }, 
            ],
          },
        ],
      },
      { path: '*', element: <ErrorBoundary /> }, 
    ],
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
