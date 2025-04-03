/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Input, Button } from "../../../../../index";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import Service from "../../../../../../config/Service";
import AddMoreSubtask from "./AddMoreSubtask.jsx";
import { toast } from "react-toastify";

const SelectedWBTask = ({
  onClose,
  selectedTask,
  selectedTaskId,
  selectedActivity,
  projectId,
}) => {
  console.log(selectedTask);
  const workBreakdown = useSelector(
    (state) => state?.projectData.workBreakdown
  );
  console.log(selectedActivity);
  const [workBD, setWorkBD] = useState("");
  const [subTaskBD, setSubTaskBD] = useState([]);
  const [selectedWBTask, setSelectedWBTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, control, setValue, watch } = useForm();

  const handleViewClick = (projectID) => {
    setSelectedWBTask(projectID);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedWBTask(null);
    setIsModalOpen(false);
  };

  const fetchWorkBD = async () => {
    const workBreakDown = workBreakdown.find(
      (wb) => wb.taskName === selectedTask
    );
    setWorkBD(workBreakDown);
  };

  const fetchSubTasks = async () => {
    const subTasks = await Service.allSubTasks(projectId, selectedTaskId);
    setSubTaskBD(subTasks);
    console.log(subTasks);
  };

  const taskData = workBD?.task?.find((task) => task.id === selectedTaskId);
  const subTasks = taskData?.subTasks || []; // Get sub-tasks

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  useEffect(() => {
    fetchSubTasks();
    fetchWorkBD();
  }, []);

  // Calculate sums for qty, execHr, and checkHr
  const calculateSums = () => {
    const totalQty = subTasks.reduce(
      (sum, subTask) => sum + (parseFloat(subTask.QtyNo) || 0),
      0
    );
    const totalExecHours = subTasks.reduce(
      (sum, subTask) =>
        sum +
        (parseFloat(subTask.execTime) * (parseFloat(subTask.QtyNo) || 0) || 0),
      0
    );
    const totalCheckHours = subTasks.reduce(
      (sum, subTask) =>
        sum +
        (parseFloat(subTask.checkTime) * (parseFloat(subTask.QtyNo) || 0) || 0),
      0
    );

    // Set the calculated values to the main task
    setValue("QtyNo", totalQty);
    setValue("execHr", totalExecHours);
    setValue("checkHr", totalCheckHours);
  };

  useEffect(() => {
    calculateSums();
  }, [subTasks]); // Recalculate when subTasks change

  // Form submission handler
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const workBreakdown = data?.subTasks?.map((workBD, index) => ({
        ...workBD,
        wbsactivityID: selectedTaskId,
        projectID: projectId,
      }));
      const response = await Service.addWorkBreakdown(
        projectId,
        selectedTaskId,
        workBreakdown
      );
      console.log("SElected task response-------------", response);
      toast.success("Work breakdown data added successfully!");
    } catch (error) {
      toast.error("Error adding work breakdown data: ", error);
    }
  };

  const handleClose = () => {
    onClose(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full p-2 bg-white rounded-lg shadow-lg h-fit md:p-5 md:w-2/5">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div>
            <b>Selected Task:</b> {taskData?.name}
          </div>
        </div>
        <div className="pt-10 bg-white h-[60vh] overflow-auto rounded-lg">
          <form
            className="flex flex-col gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <table className="w-full text-sm text-center border border-collapse border-gray-600">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 border border-gray-600">Sub-Task</th>
                  <th className="px-2 py-1 border border-gray-600">Qty</th>
                  <th className="px-2 py-1 border border-gray-600">
                    Execution Hours
                  </th>
                  <th className="px-2 py-1 border border-gray-600">
                    Checking Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {subTaskBD.map((subTask, index) => (
                  <tr key={subTask.id}>
                    {console.log("========================", subTask)}
                    <td className="px-2 py-1 border border-gray-600">
                      {subTask.description}
                    </td>
                    <td className="px-2 py-1 border border-gray-600">
                      <Controller
                        name={`subTasks[${index}].QtyNo`}
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            placeholder="QtyNo"
                            onChange={(e) => {
                              const QtyNo = parseFloat(e.target.value) || 0;
                              const unitTime =
                                parseFloat(subTask.unitTime) || 0;
                              const CheckUnitTime =
                                parseFloat(subTask.CheckUnitTime) || 0;

                              // Calculate execution hours and checking hours
                              const execHr = (QtyNo * unitTime).toFixed(2);
                              const checkHr = (QtyNo * CheckUnitTime).toFixed(
                                2
                              );
                              const description = subTask.description;
                              // Set calculated values back to the form

                              setValue(
                                `subTasks[${index}].description`,
                                description
                              );
                              setValue(`subTasks[${index}].execHr`, execHr);
                              setValue(`subTasks[${index}].checkHr`, checkHr);
                              field.onChange(e); // Update the qty field
                            }}
                          />
                        )}
                      />
                    </td>
                    <td className="px-2 py-1 border border-gray-600">
                      {watch(`subTasks[${index}].execHr`) || 0}
                    </td>
                    <td className="px-2 py-1 border border-gray-600">
                      {watch(`subTasks[${index}].checkr`) || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button type="submit">Add</Button>
          </form>
        </div>

        <div>
          <Button onClick={() => handleClick()}>
            {/* <AddMoreSubtask /> */} Add More Subtask
          </Button>
        </div>
      </div>
      {click && (
        <AddMoreSubtask
          handleClose={handleClick}
          // projectId={projectId}
          // selectedTaskId={selectedTaskId}
          // selectedTask={selectedTask}
          // selectedActivity={selectedActivity}
        />
      )}
    </div>
  );
};

export default SelectedWBTask;
