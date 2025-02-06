/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomSelect, Input, Button } from "../../../../index";

const EditFabricator = ({ fabricator, onClose }) => {
  console.log("fabricator", fabricator);
  const [files, setFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      fabName: fabricator?.fabName || "",
      email: fabricator?.email || "",
      phone: fabricator?.phone || "",
      address: fabricator?.address || "",
    },
  });

  const onFilesChange = (updatedFiles) => {
    console.log(updatedFiles)
    setFiles(updatedFiles);
  };


  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[93%] md:p-5 rounded-lg shadow-lg w-6/12 ">
        <div className="flex justify-between my-5 bg-teal-200/50 p-2 rounded-lg">
          <h2 className="text-2xl font-bold">Edit Fabricator</h2>
          <button
            className="text-xl font-bold bg-teal-500/50 hover:bg-teal-700 text-white px-5 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <Input
                label="Fabricator Name"
                type="text"
                defaultValue={fabricator?.fabName}
                {...register("fabName")}
              />
            </div>
            <div className="my-2">
              <Input
                label="Address:"
                placeholder="Address"
                defaultValue={fabricator?.address}
                {...register("address")}
              />
            </div>
            <div className="my-2">
              <Input
                label="Files:"
                placeholder="Address"
                defaultValue={fabricator?.address}
                {...register("address")}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFabricator;
