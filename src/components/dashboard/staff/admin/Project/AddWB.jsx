/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Input,
  CustomSelect,
  Button,
  JobStudy,
  SelectedWBTask,
} from "../../../../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const AddWB = ({ projectId, onClose }) => {
  const [project, setProject] = useState({});
  const [workBD, setWorkBD] = useState(null);
  const [selectedTaskData, setSelectedTaskData] = useState(null); // Add state to store selected task data
  const [selectedTaskId, setSelectedTaskId] = useState(null); // State for selected task ID
  const projectData = useSelector((state) => state?.projectData.projectData);
  const workBreakdown = useSelector(
    (state) => state?.projectData.workBreakdown
  );
  const { register, handleSubmit, watch, setValue } = useForm();

  const selectedTask = watch("taskName");
  console.log(selectedTask);
  // Fetch project data based on projectId
  const fetchProject = async () => {
    const project = projectData.find((project) => project.id === projectId);
    setProject(project || {});
  };

  // Fetch work breakdown data based on projectId
  const fetchWorkBD = async () => {
    console.log(workBreakdown.find((wb) => wb.taskName === selectedTask));
    const workBreakDown = workBreakdown.find(
      (wb) => wb.taskName === selectedTask
    ); // Fix: filter by projectId
    setWorkBD(workBreakDown);
    console.log(workBD);
  };

  // Initial fetch for project and work breakdown
  useEffect(() => {
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    fetchWorkBD();
  }, [selectedTask]);

  // Update selected task data when task changes
  useEffect(() => {
    const selectedTaskDetails = workBreakdown.find(
      (item) => item?.taskName === selectedTask
    )?.workBreakdown;
    setSelectedTaskData(selectedTaskDetails);
  }, [selectedTask, workBreakdown]);

  // Handle opening the selected WB task by setting its ID
  const handleSelectedWB = (id) => {
    console.log(id);
    setSelectedTaskId(id); // Set the selected task ID
  };

  // Handle closing the selected WB task
  const handleSelectedWBClose = () => {
    setSelectedTaskId(null); // Close selected WB task
  };

  // Close the modal
  const handleClose = () => {
    onClose(true);
  };

  // Form submission logic
  const onSubmit = (data) => {
    console.log("Form Data", data);
    // handle form submission logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[90%] md:p-5 p-2 rounded-lg shadow-lg md:w-5/6 w-11/12">
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

          <div className="font-semibold mt-10">Work Breakdown Structure -</div>
          <div className="flex py-5 justify-center">
            <form
              className="overflow-x-auto md:w-[80vw] w-full my-3"
              onSubmit={handleSubmit(onSubmit)} // Correct form submission handler
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
                        Checking Time (Hr)
                      </th>
                      <th className="border border-gray-600 px-2 py-1">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {workBD?.task?.map((taskItem, index) => (
                      <tr key={index} className="bg-green-100">
                        <td className="border border-gray-600 px-2 py-1">
                          {index + 1}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">
                          {taskItem?.name}
                        </td>
                        <td className="border border-gray-600 px-2 py-1">{taskItem?.qty}</td>
                        <td className="border border-gray-600 px-2 py-1">{taskItem?.executionTime}</td>
                        <td className="border border-gray-600 px-2 py-1">{taskItem?.checkingTime}</td>
                        <td className="border border-gray-600 px-2 py-1">
                          <Button onClick={() => handleSelectedWB(taskItem.id)}>
                            Open
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>

        {selectedTaskId && (
          <SelectedWBTask
            selectedTaskId={selectedTaskId}
            selectedTask={selectedTask}
            onClose={handleSelectedWBClose}
          />
        )}
      </div>
    </div>
  );
};

export default AddWB;
