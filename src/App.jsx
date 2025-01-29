/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";

import { useCallback, useEffect, useState } from "react";
import { Header, Sidebar } from "./components/index";
import { Outlet, useNavigate } from "react-router-dom";
import Service from "./config/Service";
// import FrappeService from "./frappeConfig/FrappeService";
import { setUserData, showStaff, showTeam } from "./store/userSlice";
import { loadFabricator, showClient } from "./store/fabricatorSlice";
import { showProjects } from "./store/projectSlice";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);

  const [isConnected, setIsConnected] = useState(false);
  const [result, setResult] = useState(true);
  const userType = sessionStorage.getItem("userType");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await Service.ping();
  //     if (result) setIsConnected(result);
  //     else setResult(result);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    console.log(token);
    const fetchUser = async () => {
      const user = await Service.getCurrentUser(token);
      dispatch(setUserData(user.data));
      console.log(user.data);
      try {
        if (user.data.role === "CLIENT") {
          console.log("Client Logged in------")
          const project = await Service?.allprojects(token);
          dispatch(showProjects(project?.data));
        } else if (user.data.role === "STAFF") {
          const userData = await Service.allEmployee(token);
          dispatch(showStaff(userData));
          const project = await Service?.allprojects(token);
          dispatch(showProjects(project?.data));
          const TeamData = await Service.allteams(token);
          dispatch(showTeam(TeamData));
          if (userType === "admin" || userType === "manager") {
            const fabricator = await Service?.allFabricator(token);
            dispatch(loadFabricator(fabricator));
            const client = await Service?.allClient(token);
            dispatch(showClient(client));
          }
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="flex flex-col w-screen h-screen overflow-hidden md:flex-row bg-gradient-to-r from-green-300/50 to-teal-300">
        {/* Sidebar */}
        {/* 
        {!isConnected && (
          <>
            <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50">
              <div className="flex items-center justify-center w-full h-full px-20 py-10">
                <div className="px-32 py-20 text-red-700 bg-white border-2 border-red-700 rounded-3xl">
                  {result
                    ? "Connecting to Server, Please Wait..."
                    : "Connection Failed, Please Check Your Internet Connection"}
                </div>
              </div>
            </div>
          </>
        )} */}

        <div className="flex flex-col w-full">
          <div className="mx-5 my-2 shadow-2xl drop-shadow-lg">
            <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
          {/* Header */}
          <div className="flex flex-row">
            <div
              className={`fixed md:static flex flex-col md:bg-opacity-0 bg-white w-64 z-20 transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0 md:w-64`}
            >
              <div className="flex items-center justify-between p-4">
                <Sidebar />
              </div>
            </div>
            {/* Main Content */}
            <div
              className={`flex h-[89vh] overflow-y-auto flex-grow transition-all duration-300 ${
                sidebarOpen ? "md:ml-64 ml-0 bg-black/50" : "md:ml-0 ml-0"
              }`}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
