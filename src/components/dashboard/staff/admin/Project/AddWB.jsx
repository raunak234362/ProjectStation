/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Input, CustomSelect, Button } from "../../../../index";
import { useForm, Controller,useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";

const AddWB = ({ projectId, onClose }) => {
  const [project, setProject] = useState({});
  const projectData = useSelector((state) => state?.projectData.projectData);
  // const [rows, setRows] = useState([
  //   { description: "", qty: "", unitTime: "", executionTime: "" },
  // ]);
  const { register, handleSubmit, watch, control, setValue } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "rows",
  });

  const fetchProject = async () => {
    const project = projectData.find((project) => project.id === projectId);
    setProject(project || {});
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const addRow = () => {
    const currentRows = watch("rows") || [];
    setValue("rows", [
      ...currentRows,
      { description: "", qty: 0, unitTime: 0, executionTime: 0 },
    ]);
  };
  const handleClose = () => {
    onClose(true);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const rows = watch("rows");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[60%] md:p-5 p-2 rounded-lg shadow-lg md:w-5/6 w-4/5">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>

        <div className="top-2 w-full flex justify-center z-10">
          <div className="mt-2">
            <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
              Work-Break Down Structure
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-x-auto mt-5 md:w-[80vw] w-[75vw] my-3"
        >
          <table className="w-full border-collapse border border-gray-600 text-center text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-600 px-2 py-1">Sl.No</th>
                <th className="border border-gray-600 px-2 py-1">
                  Description of WBS
                </th>
                <th className="border border-gray-600 px-2 py-1">Qty. (No.)</th>
                <th className="border border-gray-600 px-2 py-1">Unit Time</th>
                <th className="border border-gray-600 px-2 py-1">
                  Execution Time (Hr)
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-green-100">
                <td className="border border-gray-600 px-2 py-1">
                  <b>JS</b>
                </td>
                <td className="border border-gray-600 px-2 py-1">
                  <b>Job Study</b>
                </td>
                <td className="border border-gray-600 px-2 py-1"></td>
                <td className="border border-gray-600 px-2 py-1"></td>
                <td className="border border-gray-600 px-2 py-1"></td>
              </tr>

              {rows?.map((row, index) => {
                const qty = watch(`rows.${index}.qty`) || 0;
                const unitTime = watch(`rows.${index}.unitTime`) || 0;
                const executionTime = ((qty * unitTime) / 60).toFixed(2);

                return (
                  <tr key={index}>
                    <td className="border border-gray-600 px-2 py-1">
                      {index + 1}
                    </td>

                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.description`}
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            {...field}
                            label="Job Study - Description"
                            color="blue"
                            options={[
                              {
                                label: "Job Study - Modeling",
                                value: "Modeling",
                              },
                              {
                                label: "Job Study - Detailing",
                                value: "Detailing",
                              },
                              {
                                label: "Job Study - Erection",
                                value: "Erection",
                              },
                              {
                                label: "Job Study - Checking",
                                value: "Checking",
                              },
                            ]}
                            onChange={(value) => field.onChange(value)}
                          />
                        )}
                      />
                    </td>

                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.qty`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            placeholder="Qty"
                            size="md"
                          />
                        )}
                      />
                    </td>

                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.unitTime`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            placeholder="Unit Time"
                            size="md"
                          />
                        )}
                      />
                    </td>

                    <td className="border border-gray-600 px-2 py-1">
                      {executionTime}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between">
            <Button onClick={addRow} className="bg-green-500 text-white">
              Add Row
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWB;
