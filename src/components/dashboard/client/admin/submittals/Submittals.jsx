/* eslint-disable no-unused-vars */
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {useSelector} from "react-redux";

const Submittals = () => {
  const submittals= useSelector((state)=>state.projectData?.submittals);
  console.log(submittals);
  return (
    <div className="w-full mx-5">
      <div className="flex w-full justify-center items-center">
        <div className="text-3xl font-bold text-white bg-teal-500/50 shadow-xl px-5 py-1 mt-2 rounded-lg">
          Submittals
        </div>
      </div>
      <div className="my-5 grid grid-cols-2 gap-5 md:grid-cols-3">
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">
            Total Submittals
          </div>
          {/* <div className="text-3xl font-bold">{fabricators.length}</div> */}
        </div>
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">Total Submittals Received</div>
          {/* <div className="text-3xl font-bold">{clients.length}</div> */}
        </div>
      </div>

      {/* Conditional rendering of menu */}
      <div className={` rounded-lg bg-white md:text-lg text-sm`}>
        <div className="overflow-auto rounded-lg bg-teal-100 md:w-full w-[90vw]">
          <nav className="px-5 drop-shadow-md text-center">
            <ul className=" flex items-center justify-evenly gap-10 py-1 text-center">
              <li className="px-2">
                <NavLink
                  to="send-submittals"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-teal-500/50 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                      : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                  }
                >
                  Send Submittals
                </NavLink>
              </li>
              <li className="px-2">
                <NavLink
                  to="all-submittals"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-teal-500/50 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                      : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                  }
                >
                  All Sent Submittals
                </NavLink>
              </li>
              <li className="px-2">
                <NavLink
                  to="all-received-submittals"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-teal-500/50 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                      : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                  }
                >
                  All Received Submittals
                </NavLink>
              </li>

              {/* <li className="px-2">
                <NavLink
                  to="all-clients"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-teal-500/50 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                      : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                  }
                >
                  All Clients
                </NavLink>
              </li> */}
            </ul>
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Submittals