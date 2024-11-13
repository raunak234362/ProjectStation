/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Input, CustomSelect, Button, JobStudy } from "../../../../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import task from "./task.json";

const AddWB = ({ projectId, onClose }) => {
  const [project, setProject] = useState({});
  const projectData = useSelector((state) => state?.projectData.projectData);
  const { register, handleSubmit, watch, control, setValue } = useForm();

  const selectedTask = watch("taskName");
  const selectedTaskData = task?.taskDetail?.find(
    (item) => item?.taskName === selectedTask
  )?.task;

  console.log(selectedTaskData);

  const fetchProject = async () => {
    const project = projectData.find((project) => project.id === projectId);
    setProject(project || {});
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const handleClose = () => {
    onClose(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[90%] md:p-5 p-2 rounded-lg shadow-lg md:w-5/6 w-4/5">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>

        <div className="top-2 w-full flex justify-center z-10">
          <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
            Work-Break Down Structure
          </div>
        </div>
        <div className="h-[85%] overflow-y-auto">
          <JobStudy />

          <div className=" flex py-5 justify-center mt-5">
            <form
              className="overflow-x-auto mt-5 md:w-[80vw] w-[75vw] my-3"
              onSubmit={handleSubmit()}
            >
              <div className="my-5">
                <CustomSelect
                  label="WBS - Description"
                  color="blue"
                  options={[
                    { label: "Modeling", value: "MODELING" },
                    { label: "Detailing", value: "DETAILING" },
                    { label: "Erection", value: "ERECTION" },
                  ]}
                  {...register("taskName", { required: true })}
                  onChange={setValue}
                />
              </div>
              <div className="mt-5 bg-white h-[60vh] overflow-auto rounded-lg">
                <table className="w-full mt-3 border-collapse border border-gray-600 text-center text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-600 px-2 py-1">
                        Sl.No
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Description of WBS
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Qty. (No.)
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Execution Time (Hr)
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Sl.No
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Checking
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Qty. (No.)
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Checking Time (Hr)
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="overflow-y-auto">
                    {selectedTaskData?.map((taskItem, index) => (
                      <tr key={index} className="bg-green-100">
                        <td className="border border-gray-600 px-2 py-1">
                          {index + 1}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          {taskItem.name}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          {/* Qty */}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          {/* Execution Time */}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          {/* Checking ID */}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          {/* Checking */}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          {/* Checking Qty */}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          {/* Checking Time */}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          <Button>Open</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWB;
