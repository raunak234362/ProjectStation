/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom'
import LOGO from '../../../assets/logo.png'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const data = useSelector((state) => state.userData.userData)
  console.log(data)
  return (
    <div className="flex flex-col h-screen w-64 bg-white/70 md:border-4 text-black rounded-xl">
      
      <nav className="p-5">
        <ul className="flex flex-col gap-5">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-black'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="client"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-black'
              }
            >
              Client
            </NavLink>
          </li>
          <li>
            <NavLink
              to="project"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-black'
              }
            >
              Project
            </NavLink>
          </li>
          <li>
            <NavLink
              to="rfi"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-black'
              }
            >
              RFI
            </NavLink>
          </li>
          <li>
            <NavLink
              to="submittals"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-black'
              }
            >
              Submittals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="change-order"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-black'
              }
            >
              Change Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to="update-program"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-black'
              }
            >
              Update Program
            </NavLink>
          </li>
          <li>
            <NavLink
              to="manage-team"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-black'
              }
            >
              Manage Team
            </NavLink>
          </li>
        </ul>
      </nav>
       <div className='text-xl text-black max-md:hidden'>
         username {data?.username}
       </div>
    </div>
  )
}

export default Sidebar
