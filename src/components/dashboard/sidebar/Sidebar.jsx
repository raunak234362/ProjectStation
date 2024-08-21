/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom'
import LOGO from '../../../assets/logo.png'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const data = useSelector((state) => state.userData.userData)

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-800 text-white">
      {/* <div className="flex mx-auto p-5 justify-between">
        <img src={LOGO} alt="logo" className="w-40 bg-white rounded-lg" />
      </div> */}
      <nav className="p-5">
        <ul className="flex flex-col gap-5">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-white'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="client"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-white'
              }
            >
              Client
            </NavLink>
          </li>
          <li>
            <NavLink
              to="project"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-white'
              }
            >
              Project
            </NavLink>
          </li>
          <li>
            <NavLink
              to="rfi"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-white'
              }
            >
              RFI
            </NavLink>
          </li>
          <li>
            <NavLink
              to="submittals"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-white'
              }
            >
              Submittals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="change-order"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-white'
              }
            >
              Change Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to="update-program"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-white'
              }
            >
              Update Program
            </NavLink>
          </li>
          <li>
            <NavLink
              to="manage-team"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'text-white'
              }
            >
              Manage Team
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
