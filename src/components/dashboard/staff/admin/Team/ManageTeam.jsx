/* eslint-disable no-unused-vars */
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { NavLink, Route, Routes, Outlet } from "react-router-dom";
const ManageTeam = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false)

  const toggleMenu = () =>{
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full mx-5">
      {/* Title */}
      <div className="flex w-full justify-center items-center">
        <div className="text-2xl md:text-3xl font-bold text-white bg-green-500/70 shadow-xl px-3 md:px-5 py-1 mt-2 rounded-lg">
          Team
        </div>
      </div>

      {/* Statistics */}
      <div className="my-5 grid grid-cols-2 md:grid-cols-3 gap-5">
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-lg md:text-xl text-gray-800">Total Team</div>
          <div className="text-2xl md:text-3xl font-bold">50</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-lg md:text-xl text-gray-800">Total No. of Users</div>
          <div className="text-2xl md:text-3xl font-bold">30</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-lg md:text-xl text-gray-800">Total No. of Clients</div>
          <div className="text-2xl md:text-3xl font-bold">20</div>
        </div>
      </div>

      <div className="md:hidden flex justify-end mb-3">
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IoIosCloseCircle /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Navbar */}
      <div
        className={`w-full rounded-lg bg-white/70 ${isMenuOpen ? 'block' : 'hidden'} md:block`}
      >
        <nav className="bg-white rounded-lg drop-shadow-md">
          <ul className="flex flex-wrap sm:flex-row flex-col gap-2 py-3 justify-center sm:justify-start">
            <li className="px-2">
              <NavLink
                to="add-employee"
                className={({ isActive }) =>
                  isActive
                    ? "bg-teal-300 drop-shadow-lg px-3 md:px-5 py-2 rounded-lg font-semibold"
                    : "hover:bg-teal-200 rounded-lg px-3 md:px-5 py-2 hover:text-white"
                }
              >
                Add Employee
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink
                to="all-employees"
                className={({ isActive }) =>
                  isActive
                    ? "bg-teal-300 drop-shadow-lg px-3 md:px-5 py-2 rounded-lg font-semibold"
                    : "hover:bg-teal-200 rounded-lg px-3 md:px-5 py-2 hover:text-white"
                }
              >
                All Employee
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink
                to="add-department"
                className={({ isActive }) =>
                  isActive
                    ? "bg-teal-300 drop-shadow-lg px-3 md:px-5 py-2 rounded-lg font-semibold"
                    : "hover:bg-teal-200 rounded-lg px-3 md:px-5 py-2 hover:text-white"
                }
              >
                Add Department
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink
                to="all-department"
                className={({ isActive }) =>
                  isActive
                    ? "bg-teal-300 drop-shadow-lg px-3 md:px-5 py-2 rounded-lg font-semibold"
                    : "hover:bg-teal-200 rounded-lg px-3 md:px-5 py-2 hover:text-white"
                }
              >
                All Department
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
        <Outlet />
    </div>
  );
};

export default ManageTeam;
