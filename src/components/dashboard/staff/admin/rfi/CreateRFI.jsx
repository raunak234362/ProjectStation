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
  const fabricatorData = useSelector(
    (state) => state?.fabricatorData?.fabricatorData
  );
  const clientData = useSelector((state) => state?.fabricatorData?.clientData);
  console.log(clientData);
  const dispatch = useDispatch();
  // console.log(projectData);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);

  const fabricatorID = watch("fabricator_id");
  console.log("Selected Fabricator ID:", fabricatorID);

  const selectedFabricator = fabricatorData?.find(
    (fabricator) => fabricator.id === fabricatorID
  );
  const clientName = selectedFabricator
    ? clientData?.find((client) => client.id === selectedFabricator.clientID)
        ?.name
    : "";
  console.log("Client Name:", clientName);

  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };

  const fabricatorOptions = fabricatorData?.map((fabricator) => ({
    label: fabricator.fabName,
    value: fabricator.id,
  }));

  const filteredClients = clientData?.filter(
    (client) => client.fabricatorId === fabricatorID
  );
  console.log("Filtered Clients:", filteredClients);
  const clientOptions = filteredClients?.map((client) => ({
    label: `${client.f_name} ${client.l_name}`,
    value: client.id,
  }));

  const filteredProjects = projectData?.filter(
    (project) => project.fabricatorID === fabricatorID
  );
  console.log("Filtered Projects:", filteredProjects);
  const projectOptions = filteredProjects?.map((project) => ({
    label: project.name,
    value: project.id,
  }));

  const CreateRFI = async (data) => {
    const formData = new FormData();

    // Append files
    files?.map((file) => {
      formData.append("files", file);
      console.log("File:", formData?.append);
    });

    
    
    const rfiData = {...data, files: formData};
    console.log("Sending Data:", rfiData); // Debugging

    try {
      const response = await Service.addRFI(rfiData);
      console.log("RFI created successfully:", response);
    } catch (error) {
      console.error("Error creating RFI:", error);
    }
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
                  ...fabricatorOptions,
                ]}
                {...register("fabricator_id", { required: true })}
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
                  ...projectOptions,
                ]}
                {...register("project_id", { required: true })}
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
                  { label: "Select Fabricator", value: "" },
                  ...clientOptions,
                ]}
                {...register("recipient_id", { required: true })}
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
                {...register("subject")}
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
