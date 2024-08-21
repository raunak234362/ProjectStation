import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginContent from './view/login/LoginContent.jsx'
import Dashboard from './view/home/Dashboard.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { AddProject, ErrorBoundary } from './components/index.js'

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
          { path: 'project', element: <AddProject /> }],
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
