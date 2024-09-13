import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosCloseCircle } from 'react-icons/io';
import { NavLink, Outlet } from 'react-router-dom';

const Fabricators = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full mx-5">
      <div className="flex w-full justify-center items-center">
        <div className="text-3xl font-bold text-white bg-teal-500/50 shadow-xl px-5 py-1 mt-2 rounded-lg">
          Fabricators
        </div>
      </div>
      <div className="my-5 grid grid-cols-2 gap-5 md:grid-cols-3">
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">Total Fabricators</div>
          <div className="text-3xl font-bold">50</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">No. of Active Fabricators</div>
          <div className="text-3xl font-bold">30</div>
        </div>
      </div>

      {/* Toggle button for mobile view */}
      <div className="md:hidden flex justify-end mb-3">
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IoIosCloseCircle /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Conditional rendering of menu */}
      <div
        className={`w-full rounded-lg bg-white/70 ${isMenuOpen ? 'block' : 'hidden'} md:block`}
      >
        <nav className="bg-white rounded-lg drop-shadow-md">
          <ul className="flex flex-col md:flex-row gap-2 py-3">
            <li className="px-2">
              <NavLink
                to="add-fabricator"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-teal-500/50 drop-shadow-lg px-5 py-2 rounded-lg font-semibold'
                    : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white'
                }
              >
                Add Fabricator
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink
                to="all-fabricator"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-teal-500/50 drop-shadow-lg px-5 py-2 rounded-lg font-semibold'
                    : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white'
                }
              >
                All Fabricator
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink
                to="add-client"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-teal-500/50 drop-shadow-lg px-5 py-2 rounded-lg font-semibold'
                    : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white'
                }
              >
                Add Client
              </NavLink>
            </li>

            <li className="px-2">
              <NavLink
                to="all-clients"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-teal-500/50 drop-shadow-lg px-5 py-2 rounded-lg font-semibold'
                    : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white'
                }
              >
                All Clients
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
        <Outlet />
    </div>
  );
};

export default Fabricators;
