/* eslint-disable react/prop-types */
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCaretLeft } from 'react-icons/fa'

const Header = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`flex items-center p-4 bg-gray-800 text-white transition-all duration-300 ${
        sidebarOpen ? 'ml-6' : ''
      }`}
    >
      <button
        className="p-2 m-2 bg-blue-500 text-white rounded"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <FaCaretLeft /> : <GiHamburgerMenu />}
      </button>
      <div
        className={`fixed inset-0 z-10 transition-opacity duration-300 ${
          sidebarOpen ? 'md:opacity-0 opacity-55 md:bg-none bg-black' : ' opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  )
}

export default Header
