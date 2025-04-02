/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Input, CustomSelect, Button } from "../../../../../index";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Service from "../../../../../../config/Service";
import { Select } from "@material-tailwind/react";

const JobStudy = ({ projectId }) => {
  const [isJobStudySet, setIsJobStudySet] = useState(false); // To track if job study is already set
  const { register, handleSubmit, watch, control, setValue, setError } = useForm({
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

  useEffect(() => {
    const fetchJobStudy = async () => {
      try {
        const response = await Service.getJobStudy(projectId);
        if (response?.length > 0) {
          setIsJobStudySet(true);
        }
      } catch (error) {
        console.log("Error fetching job study data: ", error);
      }
    };
    fetchJobStudy();
  }, [projectId]);

  const baseOptions = [
    { label: "Job Study - Modeling", value: "Modeling" },
    { label: "Job Study - Detailing", value: "Detailing" },
    { label: "Job Study - Erection", value: "Erection" },
    { label: "Job Study - Checking", value: "Checking" },
  ];

  const handleJobStudy = async (data) => {
    if (isJobStudySet) return;

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
      setIsJobStudySet(true); // Disable the form after successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center font-bold">Job Study</div>

      <form onSubmit={handleSubmit(handleJobStudy)} className="my-3 mt-5">
        <div className="md:w-[80vw] overflow-x-auto w-full">
          <table className="w-full text-sm text-center border border-collapse border-gray-600">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 border border-gray-600">Sl.No</th>
                <th className="px-2 py-1 border border-gray-600">Description of WBS</th>
                <th className="px-2 py-1 border border-gray-600">QtyNo. (No.)</th>
                <th className="px-2 py-1 border border-gray-600">Unit Time</th>
                <th className="px-2 py-1 border border-gray-600">Execution Time (Hr)</th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-green-100">
                <td className="px-2 py-1 border border-gray-600"><b>JS</b></td>
                <td className="px-2 py-1 border border-gray-600"><b>Job Study</b></td>
                <td className="px-2 py-1 border border-gray-600"></td>
                <td className="px-2 py-1 border border-gray-600"></td>
                <td className="px-2 py-1 border border-gray-600"></td>
              </tr>

              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="px-2 py-1 border border-gray-600">{index + 1}</td>
                  <td className="px-2 py-1 border border-gray-600">
                    <Controller
                      name={`rows.${index}.description`}
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          disabled={isJobStudySet} // Disable if job study is set
                        >
                          {baseOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </td>
                  <td className="px-2 py-1 border border-gray-600">
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
                          disabled={isJobStudySet} // Disable if job study is set
                          onChange={(e) => {
                            field.onChange(e);
                            const QtyNo = e.target.value || 0;
                            const unitTime = watch(`rows.${index}.unitTime`) || 0;
                            setValue(`rows.${index}.execTime`, ((QtyNo * unitTime) / 60).toFixed(2));
                          }}
                        />
                      )}
                    />
                  </td>
                  <td className="px-2 py-1 border border-gray-600">
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
                          disabled={isJobStudySet} // Disable if job study is set
                          onChange={(e) => {
                            field.onChange(e);
                            const unitTime = e.target.value || 0;
                            const QtyNo = watch(`rows.${index}.QtyNo`) || 0;
                            setValue(`rows.${index}.execTime`, ((QtyNo * unitTime) / 60).toFixed(2));
                          }}
                        />
                      )}
                    />
                  </td>
                  <td className="px-2 py-1 border border-gray-600">
                    {watch(`rows.${index}.execTime`) || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between w-full mt-4">
          <Button type="submit" className="w-full text-white bg-blue-500" disabled={isJobStudySet}>
            {isJobStudySet ? "Already Set" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobStudy;
