/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Input, CustomSelect, Button } from "../../../../../index";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Service from "../../../../../../config/Service";
import { Select } from "@material-tailwind/react";

const JobStudy = ({ projectId }) => {
  const [isJobStudySet, setIsJobStudySet] = useState(false);
  const { register, handleSubmit, watch, control, setValue, setError, reset } = useForm({
    defaultValues: {
      rows: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "rows",
  });

  useEffect(() => {
    const fetchJobStudy = async () => {
      try {
        const response = await Service.allJobStudy(projectId);
        if (response?.length > 0) {
          setIsJobStudySet(true);
          setValue("rows", response); // Update form fields with API data
        }
      } catch (error) {
        console.log("Error fetching job study data: ", error);
      }
    };
    fetchJobStudy();
  }, [projectId, setValue]); // Add setValue as a dependency
  

  const handleJobStudy = async (data) => {
    if (isJobStudySet) return;

    const jobData = data?.rows?.map((job) => ({
      ...job,
      projectId,
      QtyNo: Number(job.QtyNo),
      unitTime: Number(job.unitTime),
      execTime: Number(job.execTime),
    }));

    try {
      const response = await Service.addJobStudy(jobData);
      console.log(response);
      setIsJobStudySet(true);
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
                        <input {...field} disabled={isJobStudySet} />
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
                          disabled={isJobStudySet}
                          onChange={(e) => {
                            field.onChange(e);
                            setValue(`rows.${index}.execTime`, ((e.target.value * watch(`rows.${index}.unitTime`)) / 60).toFixed(2));
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
                          disabled={isJobStudySet}
                          onChange={(e) => {
                            field.onChange(e);
                            setValue(`rows.${index}.execTime`, ((watch(`rows.${index}.QtyNo`) * e.target.value) / 60).toFixed(2));
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