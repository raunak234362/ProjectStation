import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginContent from './view/login/LoginContent.jsx'
import Dashboard from './view/home/Dashboard.jsx'
import Project from './view/projects/Project.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { AddProject, EditProject, ErrorBoundary, MainContent, Projects } from './components/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LoginContent /> },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard/',
            element: <MainContent />,
          },
          {
            path: 'project',
            element: <Project />,
            children: [
              { path: '/dashboard/project', element: <Projects /> },
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
