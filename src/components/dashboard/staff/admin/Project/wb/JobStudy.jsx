/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Input, CustomSelect, Button } from "../../../../../index";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import Service from "../../../../../../config/Service";

const JobStudy = ({ projectId }) => {
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      rows: [
        { description: "Modeling", QtyNo: 0, unitTime: 0, execTime: 0 },
        { description: "Detailing", QtyNo: 0, unitTime: 0, execTime: 0 },
        { description: "Erection", QtyNo: 0, unitTime: 0, execTime: 0 },
        { description: "Checking", QtyNo: 0, unitTime: 0, execTime: 0 },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "rows",
  });

  const baseOptions = [
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
  ];

  const handleJobStudy = async (data) => {
    // Convert string values to numbers
    const jobData = data?.rows?.map((job) => ({
      ...job,
      projectId,
      QtyNo: Number(job.QtyNo),
      unitTime: Number(job.unitTime),
      execTime: Number(job.execTime),
    }));

    console.log(jobData);
    try {
      const response = await Service.addJobStudy(jobData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center font-bold">
          Job Study
        </div>

        <form onSubmit={handleSubmit(handleJobStudy)} className="mt-5 my-3">
          <div className="md:w-[80vw] overflow-x-auto w-full">
            <table className="w-full border-collapse border border-gray-600 text-center text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-600 px-2 py-1">Sl.No</th>
                  <th className="border border-gray-600 px-2 py-1">
                    Description of WBS
                  </th>
                  <th className="border border-gray-600 px-2 py-1">
                    QtyNo. (No.)
                  </th>
                  <th className="border border-gray-600 px-2 py-1">
                    Unit Time
                  </th>
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

                {fields.map((field, index) => (
                  <tr key={field.id}>
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
                              baseOptions.find(
                                (option) => option.value === field.value
                              ),
                            ]}
                            disabled={true}
                          />
                        )}
                      />
                    </td>

                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.QtyNo`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            placeholder="QtyNo"
                            size="md"
                            onChange={(e) => {
                              field.onChange(e);
                              const QtyNo = e.target.value || 0;
                              const unitTime =
                                watch(`rows.${index}.unitTime`) || 0;
                              setValue(
                                `rows.${index}.execTime`,
                                ((QtyNo * unitTime) / 60).toFixed(2)
                              );
                            }}
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
                            onChange={(e) => {
                              field.onChange(e);
                              const unitTime = e.target.value || 0;
                              const QtyNo = watch(`rows.${index}.QtyNo`) || 0;
                              setValue(
                                `rows.${index}.execTime`,
                                ((QtyNo * unitTime) / 60).toFixed(2)
                              );
                            }}
                          />
                        )}
                      />
                    </td>

                    <td className="border border-gray-600 px-2 py-1">
                      {watch(`rows.${index}.execTime`) || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex w-full justify-between">
            <Button type="submit" className="bg-blue-500 w-full text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobStudy;
