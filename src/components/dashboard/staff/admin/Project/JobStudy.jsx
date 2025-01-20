/* eslint-disable no-unused-vars */
import React from "react";
import { Input, CustomSelect, Button } from "../../../../index";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";

const JobStudy = () => {
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      rows: [
        { description: "Modeling", qty: 0, unitTime: 0, executionTime: 0 },
        { description: "Detailing", qty: 0, unitTime: 0, executionTime: 0 },
        { description: "Erection", qty: 0, unitTime: 0, executionTime: 0 },
        { description: "Checking", qty: 0, unitTime: 0, executionTime: 0 },
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

  const handleJobStudy = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(handleJobStudy)}
          className="overflow-x-auto mt-5 md:w-[80vw] w-[75vw] my-3"
        >
          <div className="flex justify-center items-center font-bold">
            Job Study
          </div>
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
                      name={`rows.${index}.qty`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="0"
                          placeholder="Qty"
                          size="md"
                          onChange={(e) => {
                            field.onChange(e);
                            const qty = e.target.value || 0;
                            const unitTime =
                              watch(`rows.${index}.unitTime`) || 0;
                            setValue(
                              `rows.${index}.executionTime`,
                              ((qty * unitTime) / 60).toFixed(2)
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
                            const qty = watch(`rows.${index}.qty`) || 0;
                            setValue(
                              `rows.${index}.executionTime`,
                              ((qty * unitTime) / 60).toFixed(2)
                            );
                          }}
                        />
                      )}
                    />
                  </td>

                  <td className="border border-gray-600 px-2 py-1">
                    {watch(`rows.${index}.executionTime`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
