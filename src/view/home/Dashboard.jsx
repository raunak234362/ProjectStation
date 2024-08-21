import { useState } from 'react'
import { Header, Sidebar } from '../../components/index'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Start collapsed on mobile view

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}

      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-row">
          <div
            className={`fixed md:static flex flex-col h-screen bg-slate-800 text-white w-64 z-20 transition-transform duration-300 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:w-64`}
          >
            <div className="flex justify-between items-center p-4">
              <Sidebar />
            </div>
          </div>
          {/* Main Content */}
          <div
            className={`flex flex-grow transition-all duration-300 ${
              sidebarOpen ? 'md:ml-64 ml-0 bg-black/50' : 'md:ml-4 ml-0'
            }`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
