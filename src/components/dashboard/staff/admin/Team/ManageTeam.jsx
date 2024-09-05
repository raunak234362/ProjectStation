/* eslint-disable no-unused-vars */
import { NavLink, Route, Routes, Outlet } from "react-router-dom";
const ManageTeam = () => {
  return (
    <div className="w-full mx-5">
    <div className="flex w-full justify-center items-center">
      <div className="text-3xl font-bold text-white bg-green-500/70 shadow-xl px-5 py-1 mt-2 rounded-lg">
        Team
      </div>
    </div>
    <div className="my-5 grid md:grid-cols-3 grid-cols-2 gap-5 ">
      <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
        <div className="font-bold text-xl text-gray-800">Total Team</div>
        <div className="text-3xl font-bold">50</div>
      </div>
      <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
        <div className="font-bold text-xl text-gray-800">Total No. of Users</div>
        <div className="text-3xl font-bold">30</div>
      </div>
      <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
        <div className="font-bold text-xl text-gray-800">Total No. of Clients</div>
        <div className="text-3xl font-bold">20</div>
      </div>
    </div>
    <div className="w-full rounded-lg bg-white/70">
      <nav className="bg-white rounded-lg drop-shadow-md">
        <ul className="flex flex-row gap-2 py-3">
          <li className="px-2">
            <NavLink to="add-employee" className={({ isActive }) => (isActive ? 'bg-teal-300 drop-shadow-lg px-5 py-2 rounded-lg font-semibold' : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white')}>
              Add Employee
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink to="all-employees" className={({ isActive }) => (isActive ? 'bg-teal-300 drop-shadow-lg px-5 py-2 rounded-lg font-semibold' : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white')}>
              All Employee
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  </div>
  )
}

export default ManageTeam