/* eslint-disable react/prop-types */
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCaretLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import LOGO from '../../../assets/logo.png'

const Header = ({ sidebarOpen, toggleSidebar }) => {
  const data = useSelector((state) => state.userData)
  return (
    <div className="flex px-2 flex-row justify-between items-center w-full bg-gray-800 text-white ">
      <div
        className={`flex items-center p-4 transition-all duration-300 ${
          sidebarOpen ? 'ml-4' : ''
        }`}
      >
        <div
          className={`fixed inset-0 z-10 transition-opacity duration-300 ${
            sidebarOpen
              ? 'md:opacity-0 opacity-55 md:bg-none bg-black'
              : ' opacity-0 pointer-events-none'
          }`}
          onClick={toggleSidebar}
        ></div>
        <img
          src={LOGO}
          alt=""
          className="md:w-32 w-20 bg-white/50 rounded-xl"
        />
      </div>

      <div></div>
      {sidebarOpen ? (
        <button
          className="p-2 m-2 md:hidden bg-blue-500 text-white rounded"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <FaCaretLeft /> : <GiHamburgerMenu />}
        </button>
      ) : (
        <div className={` ${!sidebarOpen ? '' : 'hidden'}`}>
          username {data?.username}
        </div>
      )}
    </div>
  )
}

export default Header
