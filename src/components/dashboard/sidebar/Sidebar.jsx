/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom'
import LOGO from '../../../assets/logo.png'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const data = useSelector((state) => state.userData.userData)

  return (
    <div className="flex flex-col md:h-[88vh] h-screen w-64 bg-white/70 md:border-4 text-black rounded-xl">
      <nav className="p-5">
        <ul className="flex flex-col gap-5">
          <li className="w-full">
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150 transition-all ease-in-out'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>Home</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/fabricator"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>Fabricator</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/vendor"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>Vendor</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/project"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>Project</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="rfi"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>RFI</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="submittals"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>Submittals</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="change-order"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>Change Order</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="update-program"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>Update Program</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="team"
              className={({ isActive }) =>
                isActive
                  ? 'flex justify-center items-center text-white bg-teal-400 rounded-md w-full delay-150'
                  : 'text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md'
              }
            >
              <div>Manage Team</div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="text-xl text-black md:hidden block">
        username {data?.username}
      </div>
    </div>
  )
}

export default Sidebar
