/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import MultipleFileUpload from "../../../../fields/MultipleFileUpload";
import Input from "../../../../fields/Input";
import { CustomSelect } from "../../../..";
import { Button } from "@material-tailwind/react";
import { NavLink, Outlet } from "react-router-dom";

const RFQ = () => {
  const dispatch = useDispatch();
  // console.log(projectData);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);

  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };
  const onSubmit = async (data) => {
    console.log(data);
    const formData = { ...data, files };
    console.log("data==========================", formData);
    // const response = await Service.addRFI(formData);
  };
  return (
    <div className="w-full h-[89vh] overflow-y-hidden mx-5">
      <div className="flex w-full justify-center items-center">
        <div className="text-3xl font-bold text-white bg-green-500/70 shadow-xl px-5 py-1 mt-2 rounded-lg">
          Projects
        </div>
      </div>
      <div className="h-[85vh] mt-2 overflow-y-auto">
        <div className="my-5 grid md:grid-cols-3 grid-cols-2 gap-5">
          <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
            <div className="font-bold text-xl text-gray-800">All Projects</div>
            {/* <div className="text-3xl font-bold">{projects.length}</div> */}
          </div>
          <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
            <div className="font-bold text-xl text-gray-800">
              No. of Active Projects
            </div>
            {/* <div className="text-3xl font-bold">{activeProjectsCount}</div> */}
          </div>
          <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
            <div className="font-bold text-xl text-gray-800">
              No. of Completed Projects
            </div>
            {/* <div className="text-3xl font-bold">{completedProjectsCount}</div> */}
          </div>
        </div>

        {/* Conditional rendering of menu */}
        <div className={`rounded-lg bg-white md:text-lg text-sm`}>
          <div className="overflow-auto bg-teal-100 rounded-lg md:w-full w-[90vw]">
            <nav className="px-5 drop-shadow-md text-center">
              <ul className="flex items-center justify-evenly gap-10 py-1 text-center">
                <li className="px-2">
                  <NavLink
                    to="all-rfq"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-teal-300 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                        : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                    }
                  >
                    All RFQ
                  </NavLink>
                </li>
                <li className="px-2">
                  <NavLink
                    to="add-rfq"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-teal-300 drop-shadow-lg flex px-5 py-2 rounded-lg font-semibold"
                        : "hover:bg-teal-200 rounded-lg flex px-5 py-2 hover:text-white"
                    }
                  >
                    Add New RFQ
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RFQ;
