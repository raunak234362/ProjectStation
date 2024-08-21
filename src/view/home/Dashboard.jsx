/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { AddProject, Header, MainContent, Sidebar } from '../../components/index'
import { Outlet,Route, Routes } from 'react-router-dom'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div
        className={`fixed md:static flex flex-col h-screen bg-slate-800 text-white w-64 z-20 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center">
          <Sidebar />
        </div>
      </div>
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          sidebarOpen ? 'md:-ml-6 ml-56' : 'md:-ml-64 ml-0'
        }`}
      >
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-grow w-full">
          <Routes>
            <Route path='/' element={<MainContent/>}/>
            <Route path='project' element={<AddProject/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
