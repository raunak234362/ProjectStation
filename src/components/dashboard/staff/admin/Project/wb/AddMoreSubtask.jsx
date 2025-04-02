import React from 'react'
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from '../../../../../fields/Button';


const AddMoreSubtask = ({ handleClose}) => {
    const { register, handleSubmit, control, setValue, watch, reset } = useForm();
    const [subtasks, setSubtask] = useState([]);

    const onSubmit = (data) => {
        console.log(data);
        const newSubtask = {
            id: subtasks.length + 1,
            description: data.description,
            executionHours: data.executionHours,
            checkingHours: data.checkingHours,
        };
        setSubtask((prevSubtasks) => [...prevSubtasks, newSubtask]);
        console.log(subtasks);
        reset();
    }

    const handleAddSubtask = () => { 
        console.log("Subtask added");
        //to display in the same table
    }
    const [index, setIndex] = useState(1);
    useEffect(() => {
        setIndex(subtasks.length + 1);
    }, [subtasks]);
    
  return (
    <>
      <div className="p-5 m-5 rounded-lg shadow-lg w-[40%] bg-white">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>
        <div className="pt-10 bg-white h-[60vh] overflow-auto rounded-lg">
          <form
            className="flex flex-col gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <table className="w-full text-sm text-center border border-collapse border-gray-600">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 border border-gray-600">SL.No</th>
                  <th className="px-2 py-1 border border-gray-600">
                    Description
                  </th>
                  <th className="px-2 py-1 border border-gray-600">
                    Unit Time
                  </th>
                  <th className="px-2 py-1 border border-gray-600">
                    Checking Unit Time
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-1 border border-gray-600">{index}</td>
                  <td className="px-2 py-1 border border-gray-600">
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          type="text"
                          placeholder="Enter description"
                          {...register("description")}
                        />
                      )}
                    />
                  </td>
                  <td className="px-2 py-1 border border-gray-600">
                    <Controller
                      name="executionHours"
                      control={control}
                      defaultValue="0"
                      render={({ field }) => (
                        <input
                          type="number"
                          placeholder="Enter execution hours"
                          {...register("executionHours")}
                        />
                      )}
                    />
                  </td>
                  <td className="px-2 py-1 border border-gray-600">
                    <Controller
                      name="checkingHours"
                      control={control}
                      defaultValue="0"
                      render={({ field }) => (
                        <input
                          type="number"
                          placeholder="Enter checking hours"
                          {...register("checkingHours")}
                        />
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button type="submit" className="m-3" onClick={handleAddSubtask}>
              Add Row
            </Button>
          </form>
          <table className="w-full text-sm text-center border border-collapse border-gray-600">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 border border-gray-600">SL.No</th>
                <th className="px-2 py-1 border border-gray-600">
                  Description
                </th>
                <th className="px-2 py-1 border border-gray-600">Unit Time</th>
                <th className="px-2 py-1 border border-gray-600">
                  Checking Unit Time
                </th>
              </tr>
            </thead>
            <tbody className="px-2 py-1 border border-gray-600">
              {subtasks.map((subtask) => (
                <tr key={subtask.id}>
                  <td className="px-2 py-1 border border-gray-600">
                    {subtask.id}
                  </td>
                  <td className="px-2 py-1 border border-gray-600">
                    {subtask.description}
                  </td>
                  <td className="px-2 py-1 border border-gray-600">
                    {subtask.executionHours}
                  </td>
                  <td className="px-2 py-1 border border-gray-600">
                    {subtask.checkingHours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AddMoreSubtask