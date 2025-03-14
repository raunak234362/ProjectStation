/* eslint-disable no-unused-vars */
import { NavLink, Route, Routes, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Service from "../../../../../config/Service";

const RFI = () => {
const [rfi,setRfi]=useState([])
  

  const fetchSentRfi = async () => {
    try {
      const response = await Service.sentRFI();
      setRfi(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSentRfi();
  }, []);

  return (
    <div className="w-full mx-5">
      <div className="flex w-full justify-center items-center">
        <div className="text-3xl font-bold text-white bg-green-500/70 shadow-xl px-5 py-1 mt-2 rounded-lg">
          RFI
        </div>
      </div>
      <div className="my-5 grid md:grid-cols-3 grid-cols-2 gap-5 ">
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">Total Send RFI</div>
          <div className="text-3xl font-bold">50</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">
            Total Received RFI
          </div>
          <div className="text-3xl font-bold"></div>
        </div>
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">No. of Open RFI</div>
          <div className="text-3xl font-bold">30</div>
        </div>
      </div>
      {/* Conditional rendering of menu */}
      <div className={` rounded-lg bg-white md:text-lg text-sm`}>
        <div className="overflow-auto bg-teal-100 rounded-lg md:w-full w-[90vw]">
          <nav className="px-5 drop-shadow-md text-center">
            <ul className=" flex items-center justify-evenly gap-10 py-1 text-center">
              <li className="px-2">
                <NavLink
                  to="create-rfi"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-teal-500/50 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                      : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                  }
                >
                  Create RFI
                </NavLink>
              </li>
              <li className="px-2">
                <NavLink
                  to="all-sent-rfi"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-teal-500/50 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                      : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                  }
                >
                  All Sent RFI
                </NavLink>
              </li>
              <li className="px-2">
                <NavLink
                  to="all-received-rfi"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-teal-500/50 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                      : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                  }
                >
                  All Received RFI
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default RFI;
