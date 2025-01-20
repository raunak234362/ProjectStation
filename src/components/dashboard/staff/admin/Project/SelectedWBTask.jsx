/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Input, CustomSelect, Button, JobStudy } from "../../../../index";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";

const SelectedWBTask = ({ onClose, selectedTask, selectedTaskId }) => {
  const workBreakdown = useSelector(
    (state) => state?.projectData.workBreakdown
  );
  const [workBD, setWorkBD] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const fetchWorkBD = async () => {
    const workBreakDown = workBreakdown.find(
      (wb) => wb.taskName === selectedTask
    ); // Fix: filter by projectId
    console.log(workBreakDown);
    setWorkBD(workBreakDown);
  };

  const taskData = workBD?.task?.find((task) => task.id === selectedTaskId);
  console.log(taskData);
  useEffect(() => {
    fetchWorkBD();
  }, []);

  // Form submission handler
  const onSubmit = async (data) => {
    const selectetWB={...taskData, ...data}
    console.log(selectetWB);
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
            <div>
              <Input 
              label="Qty" 
              name="qty"
              placeholder="Qty" 
              {...register("qty")} />
            </div>
            <div>
              <Input
                label="Unit Time"
                name="unitTime"
                placeholder="Unit Time"
                {...register("unitTime")}
              />
            </div>
            <div>
              <Input
                label="Unit Time for Checking"
                name="unitTimeChecking"
                placeholder="Unit Time for Checking"
                {...register("unitTimeChecking")}
              />
            </div>
            <Button type="submit">Add</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectedWBTask;
