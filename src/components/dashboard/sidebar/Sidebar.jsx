/* eslint-disable react-hooks/exhaustive-deps */
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
            {userType !== "human-resource" ? (
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
            ) : null}

            {userType !== "user" &&
            userType !== "client" &&
            userType !== "vendor" &&
            userType !== "human-resource" &&
            userType === "sales" ||
            userType === "admin" ? (
              <li>
                <NavLink
                  to="fabricator/all-fabricator"
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
                  to="vendor/all-vendors"
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
            {userType !== "human-resource" ? (
              <li>
                <NavLink
                  to="project/projects"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                      : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                  }
                >
                  <div>Project</div>
                </NavLink>
              </li>
            ) : null}
            {userType === "client" ||
            userType === "sales" ||
            userType === "admin" ||
            userType === "department-manager" ? (
              <li>
                <NavLink
                  to="rfq"
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150"
                      : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
                  }
                >
                  <div>RFQ</div>
                </NavLink>
              </li>
            ) : null}
            {userType !== "user" && userType !== "human-resource" ? (
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
            {userType !== "user" && userType !== "human-resource" ? (
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

            {userType !== "user" && userType !== "human-resource" ? (
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
            {userType !== "sales" && userType !== "user" && userType !== "client" && userType ==="admin" ? (
              <li>
                <NavLink
                  to="team/all-employees"
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
            <li>
              <NavLink
              to="chats"
              className={({ isActive }) =>
                isActive
                  ? "flex justify-center items-center text-white bg-teal-400 rounded-md w-full  delay-150 transition-all ease-in-out"
                  : "text-black hover:text-white hover:flex hover:justify-center hover:items-center hover:bg-teal-200  rounded-md"
              }
            >
                 <div>Chats</div>
                 </NavLink>
            </li>
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
