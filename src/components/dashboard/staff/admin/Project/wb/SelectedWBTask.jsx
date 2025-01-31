/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Input, Button } from "../../../../../index";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const SelectedWBTask = ({ onClose, selectedTask, selectedTaskId }) => {
console.log(selectedTask)

  const workBreakdown = useSelector(
    (state) => state?.projectData.workBreakdown
  );
  const [workBD, setWorkBD] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm();

  const fetchWorkBD = async () => {
    const workBreakDown = workBreakdown.find(
      (wb) => wb.taskName === selectedTask
    );
    setWorkBD(workBreakDown);
  };

  const taskData = workBD?.task?.find((task) => task.id === selectedTaskId);
  const subTasks = taskData?.subTasks || []; // Get sub-tasks

  useEffect(() => {
    fetchWorkBD();
  }, []);

  // Calculate sums for qty, execHr, and checkHr
  const calculateSums = () => {
    const totalQty = subTasks.reduce((sum, subTask) => sum + (parseFloat(subTask.qty) || 0), 0);
    const totalExecHours = subTasks.reduce((sum, subTask) => sum + (parseFloat(subTask.execTime) * (parseFloat(subTask.qty) || 0) || 0), 0);
    const totalCheckHours = subTasks.reduce((sum, subTask) => sum + (parseFloat(subTask.checkTime) * (parseFloat(subTask.qty) || 0) || 0), 0);

    // Set the calculated values to the main task
    setValue("qty", totalQty);
    setValue("execHr", totalExecHours);
    setValue("checkHr", totalCheckHours);
  };

  useEffect(() => {
    calculateSums();
  }, [subTasks]); // Recalculate when subTasks change

  // Form submission handler
  const onSubmit = async (data) => {
    const selectedWB = { ...taskData, ...data };
    console.log(selectedWB);
    // Dispatch form data to your store or API endpoint
    // dispatch(addRFI(data)) or similar
  };

  const handleClose = () => {
    onClose(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-fit md:p-5 p-2 rounded-lg shadow-lg md:w-2/5 w-full">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div>
            <b>Selected Task:</b> {taskData?.name}
          </div>
        </div>
        <div className="pt-10 bg-white h-[60vh] overflow-auto rounded-lg">
          <form
            className="gap-y-2 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <table className="w-full border-collapse border border-gray-600 text-center text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-600 px-2 py-1">Sub-Task</th>
                  <th className="border border-gray-600 px-2 py-1">Qty</th>
                  <th className="border border-gray-600 px-2 py-1">Execution Hours</th>
                  <th className="border border-gray-600 px-2 py-1">Checking Hours</th>
                </tr>
              </thead>
              <tbody>
                {subTasks.map((subTask, index) => (
                  <tr key={subTask.id}>
                    <td className="border border-gray-600 px-2 py-1">{subTask.name}</td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`subTasks[${index}].qty`}
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            placeholder="Qty"
                            onChange={(e) => {
                              const qty = parseFloat(e.target.value) || 0;
                              const execTime = parseFloat(subTask.execTime) || 0;
                              const checkTime = parseFloat(subTask.checkTime) || 0;

                              // Calculate execution hours and checking hours
                              const execHours = (qty * execTime).toFixed(2);
                              const checkHours = (qty * checkTime).toFixed(2);

                              // Set calculated values back to the form
                              setValue(`subTasks[${index}].execHours`, execHours);
                              setValue(`subTasks[${index}].checkHours`, checkHours);
                              field.onChange(e); // Update the qty field
                            }}
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      {watch(`subTasks[${index}].execHours`) || 0}
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      {watch(`subTasks[${index}].checkHours`) || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button type="submit">Add</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectedWBTask;
