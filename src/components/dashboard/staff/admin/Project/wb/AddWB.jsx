/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Input,
  CustomSelect,
  Button,
  JobStudy,
  SelectedWBTask,
} from "../../../../../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Service from "../../../../../../config/Service";

const AddWB = ({ projectId, onClose }) => {
  const [project, setProject] = useState({});
  const [selectedTaskData, setSelectedTaskData] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const projectData = useSelector((state) => state?.projectData.projectData);
  const [wbActivity, setWBActivity] = useState();
  const workBreakdown = useSelector(
    (state) => state?.projectData.workBreakdown
  );
  const { register, handleSubmit, watch, setValue } = useForm();
  const selectedTask = watch("taskName");

  const fetchWBActivity = async () => {
    if (selectedTask) {
      const wbData = await Service.fetchWorkBreakdownActivity(selectedTask);
      console.log(wbData);
      setWBActivity(wbData);
    }
  };

  useEffect(() => {
    fetchWBActivity(); // Fetch work breakdown activity when selectedTask changes
  }, [selectedTask]);

  const fetchProject = async () => {
    const project = projectData.find((project) => project.id === projectId);
    setProject(project || {});
  };

  // Initial fetch for project and work breakdown
  useEffect(() => {
    fetchProject();
  }, [projectId]);


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
    setSelectedTaskId(id);
    setSelectedActivity(selectedTask);
  };

  // Handle closing the selected WB task
  const handleSelectedWBClose = () => {
    setSelectedTaskId(null);
  };

  // Close the modal
  const handleClose = () => {
    onClose(true);
  };

  // // Form submission logic
  // const onSubmit = (data) => {
  //   console.log("Form Data", data);
  //   // handle form submission logic here
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white h-[90%] md:p-5 p-2 rounded-lg shadow-lg md:w-5/6 w-11/12">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>

        <div className="z-10 flex justify-center w-full top-2">
          <div className="px-3 py-2 font-bold text-white bg-teal-400 rounded-lg shadow-md md:px-4 md:text-2xl">
            Work-Break Down Structure
          </div>
        </div>
        <div className="h-[85%] overflow-y-auto">
          <JobStudy projectId={projectId} />

          <div className="mt-10 font-semibold">Work Breakdown Structure -</div>
          <div className="flex justify-center py-5">
            <div className="overflow-x-auto md:w-[80vw] w-full my-3">
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
              <div className="mt-5 bg-whiall-projectste h-[60vh] overflow-auto rounded-lg">
                <table className="w-full mt-3 text-sm text-center border border-collapse border-gray-600">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-2 py-1 border border-gray-600">S.No</th>
                      <th className="px-2 py-1 border border-gray-600">
                        Description of WBS
                      </th>
                      <th className="px-2 py-1 border border-gray-600">
                        Qty. (No.)
                      </th>
                      <th className="px-2 py-1 border border-gray-600">
                        Execution Time (Hr)
                      </th>
                      <th className="px-2 py-1 border border-gray-600">
                        Checking Time (Hr)
                      </th>
                      <th className="px-2 py-1 border border-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {wbActivity?.map((taskItem, index) => (
                      <tr key={index} className="bg-green-100">
                        <td className="px-2 py-1 border border-gray-600">
                          {index + 1}
                        </td>
                        <td className="px-2 py-1 border border-gray-600">
                          {taskItem?.name}
                        </td>
                        <td className="px-2 py-1 border border-gray-600">
                          {taskItem?.totalQtyNo}
                        </td>
                        <td className="px-2 py-1 border border-gray-600">
                          {taskItem?.totalExecHr}
                        </td>
                        <td className="px-2 py-1 border border-gray-600">
                          {taskItem?.totalCheckHr}
                        </td>
                        <td className="px-2 py-1 border border-gray-600">
                          <Button
                            onClick={() => handleSelectedWB(taskItem?.id)}
                          >
                            Open
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {selectedTaskId && (
          <SelectedWBTask
            projectId={projectId}
            selectedTaskId={selectedTaskId}
            selectedTask={selectedTask}
            selectedActivity={selectedActivity}
            onClose={handleSelectedWBClose}
          />
        )}
      </div>
    </div>
  );
};

export default AddWB;
