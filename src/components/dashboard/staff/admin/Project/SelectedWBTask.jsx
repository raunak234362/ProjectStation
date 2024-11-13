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

  const { fields, append } = useFieldArray({
    control,
    name: "rows",
  });

  const rows = watch("rows") || [];

  const fetchWorkBD = async () => {
    const workBreakDown = workBreakdown.find(
      (wb) => wb.taskName === selectedTask
    ); // Fix: filter by projectId
    console.log(workBreakDown);
    setWorkBD(workBreakDown);
  };

  const taskData = workBD?.task?.find((task) => task.id === selectedTaskId);

  useEffect(() => {
    fetchWorkBD();
  }, []);

  // Form submission handler
  const onSubmit = async (data) => {
    console.log(data);
    // Dispatch form data to your store or API endpoint
    // dispatch(addRFI(data)) or similar
  };

  const addRow = () => {
    const currentRows = watch("rows") || [];
    setValue("rows", [
      ...currentRows,
      {
        changeDescription: "",
        reference: "",
        element: "",
        qty: "",
        hours: "",
        cost: "",
        remarks: "",
      },
    ]);
  };

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
        <div className="flex flex-row justify-center items-center">
          <div>
            <b>Selected Task:</b> {taskData?.name}
          </div>
        </div>
        <div className="mt-5 bg-white h-[60vh] overflow-auto rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <table className="w-full mt-3 border-collapse border border-gray-600 text-center text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-600 px-2 py-1">Sl.No</th>
                  <th className="border border-gray-600 px-2 py-1">
                    Description of WBS
                  </th>
                  <th className="border border-gray-600 px-2 py-1">
                    Qty. (No.)
                  </th>
                  <th className="border border-gray-600 px-2 py-1">
                    Unit time({selectedTask})
                  </th>
                  <th className="border border-gray-600 px-2 py-1">
                    Unit time(CHECKING)
                  </th>
                  <th className="border border-gray-600 px-2 py-1">
                    Execution Time (Hr)
                  </th>
                  <th className="border border-gray-600 px-2 py-1">
                    Checking Time (Hr)
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows?.map((row, index) => (
                  <tr key={index} className="bg-green-100">
                    <td className="border border-gray-600 px-2 py-1">
                      {index + 1}
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.changeDescription`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Change of Description"
                            placeholder="Change of Description"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.changeDescription`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            label="Change of Description"
                            placeholder="Change of Description"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.changeDescription`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            label="Change of Description"
                            placeholder="Change of Description"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.changeDescription`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            label="Change of Description"
                            placeholder="Change of Description"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1"></td>
                    <td className="border border-gray-600 px-2 py-1"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button onClick={addRow} color="blue" size="lg" type="button">
              Add Row
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectedWBTask;
