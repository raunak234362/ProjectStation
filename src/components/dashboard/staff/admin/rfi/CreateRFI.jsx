/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  CustomSelect,
  Button,
  Toggle,
  MultipleFileUpload,
} from "../../../../index";
import { addRFI } from "../../../../../store/projectSlice";
import Service from "../../../../../config/Service";

const CreateRFI = () => {
  const projectData = useSelector((state) => state.projectData.projectData);
  const dispatch = useDispatch();
  // console.log(projectData);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);
  const [fileUpload, setFileUpload] = useState("");
  const [fileName, setFileName] = useState(null);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   setFileUpload(file?.name);
  //   setFileName(URL.createObjectURL(file));
  // };

  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };

  const CreateRFI = async (data) => {
    const formData = { ...data, files };
    console.log("data==========================", formData);
    const response = await Service.addRFI(formData);
    console.log("response==========================", response);
    //console.log(addRFI(data))
  };

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(CreateRFI)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Project Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full">
              <CustomSelect
                label="Fabricator Name:"
                color="blue"
                size="lg"
                name="fabricator"
                options={[
                  { label: "Select Fabricator", value: "" },
                  { label: "Fabricator 1", value: "Fabricator 1" },
                  { label: "Fabricator 2", value: "Fabricator 2" },
                ]}
                {...register("fabricator", { required: true })}
                onChange={setValue}
              />
              {errors.fabricator && <div>This field is required</div>}
            </div>
            <div className="w-full mt-3">
              <CustomSelect
                label="Project Name:"
                color="blue"
                size="lg"
                name="project"
                options={[
                  { label: "Select Project", value: "" },
                  { label: "Project 1", value: "Project 1" },
                  { label: "Project 2", value: "Project 2" },
                ]}
                {...register("project", { required: true })}
                onChange={setValue}
              />
              {errors.project && <div>This field is required</div>}
            </div>
            <div className="w-full my-3">
              <CustomSelect
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
            Attach Files:
          </div>
          <div className="my-2 md:px-2 px-1">
          <MultipleFileUpload
              label="Select Files"
              onFilesChange={onFilesChange}
              files={files}
              accept="image/*,application/pdf,.doc,.docx"
              {...register("files")}
            />
          </div>

          <div className="my-5 w-full">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRFI;
