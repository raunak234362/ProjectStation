/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import LOGO from "../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import Service from "../../../config/Service";
import { useEffect, useState } from "react";
import { Button } from "../../index";
import { logout as logoutAction } from "../../../store/userSlice";
// import AuthService from "../../../frappeConfig/AuthService";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = sessionStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState();

  const fetchUserData = async () => {
    const userData = await Service.getCurrentUser(token);
    setCurrentUser(userData[0]);
  };

  const fetchLogout = async () => {
    try {
      // const response = await AuthService.logout(token);
      sessionStorage.removeItem("userType");
      sessionStorage.removeItem("token");
      dispatch(logoutAction());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  // Sidebar.js
  // const fetchLogout = async () => {
  //   try {

  //     const response = await AuthService.logout(token);
  //     dispatch(logoutAction());
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  useEffect(() => {
    fetchUserData();
  }, []);

  const userType = sessionStorage.getItem("userType");
  return (
    <div className=" md:h-[88vh] h-screen w-64 bg-white/70 md:border-4 text-black md:rounded-xl rounded-lg">
      <div className="grid grid-cols-1 space-y-10 h-full">
        <nav className="md:p-5 p-0">
          <ul className="flex flex-col gap-5">
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                    : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                }
              >
                <div>Dashboard</div>
              </NavLink>
            </li>

            {userType !== "user" &&
            userType !== "client" &&
            userType !== "vendor" ? (
              <li>
                <NavLink
                  to="fabricator"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                      : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                  }
                >
                  <div>Fabricator</div>
                </NavLink>
              </li>
            ) : null}
            {userType === "admin" ? (
              <li>
                <NavLink
                  to="vendor"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                      : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                  }
                >
                  <div>Vendor</div>
                </NavLink>
              </li>
            ) : null}

            <li>
              <NavLink
                to="project"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                    : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                }
              >
                <div>Project</div>
              </NavLink>
            </li>
            {userType !== "user" ? (
              <li>
                <NavLink
                  to="rfi"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                      : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                  }
                >
                  <div>RFI</div>
                </NavLink>
              </li>
            ) : null}
            {userType !== "user" ? (
              <li>
                <NavLink
                  to="submittals"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                      : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                  }
                >
                  <div>Submittals</div>
                </NavLink>
              </li>
            ) : null}

            {userType !== "user" ? (
              <li>
                <NavLink
                  to="change-order"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                      : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                  }
                >
                  <div>Change Order</div>
                </NavLink>
              </li>
            ) : null}
            {/* <li>
            <NavLink
              to="update-program"
              className={({ isActive }) =>
                isActive
                  ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                  : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
              }
            >
              <div>Update Progress</div>
            </NavLink>
          </li> */}
            {userType !== "sales" && userType !== "user" ? (
              <li>
                <NavLink
                  to="team"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full delay-150"
                      : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                  }
                >
                  <div>Manage Team</div>
                </NavLink>
              </li>
            ) : null}
            <li className="w-full">
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150 transition-all ease-in-out"
                    : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                } 
              >
                <div>Profile</div>
              </NavLink>
            </li>
            <li></li>
          </ul>
        </nav>
        <div className="md:flex md:bottom-0 mb-5">
          <div className="w-full mx-auto">
            <Button className="bg-teal-400 w-full" onClick={fetchLogout}>
              Logout
            </Button>
          </div>
          <div className="text-lg text-black md:hidden block">
            {currentUser?.username}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
