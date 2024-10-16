/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Input,
  Select,
  Button,
  Toggle,
  MultipleFileUpload,
} from "../../../../index";
import { useForm } from "react-hook-form";

const SendCO = () => {
  const [files, setFiles] = useState([]);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };

  const onSubmit = async (data) => {
    console.log(data);
    //   dispatch(addRFI(data))
    // console.log(addRFI(data))
  };
  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Project Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full">
              <Select
                label="Select CO# Project:"
                color="blue"
                size="lg"
                name="fabricator"
                options={[
                  { label: "Select CO# Project", value: "" },
                  { label: "Project-1 | Add column", value: "Fabricator 1" },
                  { label: "Project-2 | Add column", value: "Fabricator 2" },
                ]}
                {...register("fabricator", { required: true })}
                onChange={setValue}
              />
              {errors.fabricator && <div>This field is required</div>}
            </div>
            <div className="w-full mt-2">
            <Select
              label="Select Recipients:"
              placeholder="Select Recipients"
              size="lg"
              color="blue"
              options={[
                { label: "Select Recipients", value: "" },
                { label: "abc@google.com - ABC", value: "abc@google.com" },
                { label: "bcd@google.com - BCD", value: "bcd@google.com" },
                { label: "bkd@google.com - BKD", value: "bkd@google.com" },
              ]}
              {...register("recipients", { required: true })}
              onChange={setValue}
            />
            {errors.recipients && <div>This field is required</div>}
            </div>
           
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Details:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <Input
                label="Subject/Remarks:"
                placeholder="Subject/Remarks"
                size="lg"
                color="blue"
                {...register("remarks")}
              />
            </div>
            <div className="w-full">
              <Input
                type="number"
                label="Change Order No. CO#"
                placeholder="CO#"
                size="lg"
                color="blue"
                min="0"
                {...register("changeOrder", { required: true })}
              />
              {errors.changeOrder && <div>This field is required</div>}
            </div>
            <div className="w-full my-3">
              <Input
                type="textarea"
                label="Description:"
                placeholder="Description"
                size="lg"
                color="blue"
                {...register("description")}
              />
            </div>
          </div>

          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Tabular Data:
          </div>
          <div className="w-full my-3">

          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Attach Files:
          </div>
          <div className="my-2 md:px-2 px-1">
            <MultipleFileUpload
              {...register("file")}
              onFilesChange={onFilesChange}
            />
          </div>

          <div className="my-5 w-full">
            <Button type="submit">Send CO#</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendCO;
