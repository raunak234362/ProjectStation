import { useState } from 'react'
import { MainContent, Sidebar } from '../../components/index'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCaretLeft } from 'react-icons/fa'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-col md:flex-row flex-grow gap-5">
      <div
        className={`fixed md:static flex flex-col h-screen md:h-auto bg-slate-800 text-white w-64 z-20 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <Sidebar />
        </div>
      </div>
      <div className={`w-full ${sidebarOpen ? 'ml-60': ''}`}>
        <button
          className="p-2 m-2 bg-blue-500 text-white rounded"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <FaCaretLeft /> : <GiHamburgerMenu />}
        </button>
      </div>
      <div
        className={`fixed inset-0 z-10 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-100 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
      <div className="flex-grow md:w-3/4">
        <MainContent />
      </div>
    </div>
  )
}

export default Dashboard
