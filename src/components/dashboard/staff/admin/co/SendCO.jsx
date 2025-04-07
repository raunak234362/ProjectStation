/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Input,
  CustomSelect,
  Button,
  MultipleFileUpload,
} from "../../../../index"; // Assuming these components are imported from your own library
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Service from "../../../../../config/Service";

const SendCO = () => {
  const [files, setFiles] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const projectData = useSelector((state) => state.projectData.projectData);
  const fabricatorData = useSelector(
    (state) => state?.fabricatorData?.fabricatorData
  );

  const clientData = useSelector((state) => state?.fabricatorData?.clientData);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "rows",
  });

  // Watch the rows field to calculate totals
  const rows = watch("rows") || [];


  const fabricatorID = watch("fabricator_id");
  const recipientID = watch("recipient_id");
  console.log("Selected Fabricator ID:", fabricatorID);
  console.log("Selected Recipient ID:", recipientID);
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


  useEffect(() => {
    const hoursSum = rows.reduce((sum, row) => sum + (parseFloat(row.hours) || 0), 0);
    const costSum = rows.reduce((sum, row) => sum + (parseFloat(row.cost) || 0), 0);
    setTotalHours(hoursSum);
    setTotalCost(costSum);
  }, [rows]);



  // Form submission handler
  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append files
    files?.map((file) => {
      formData.append("files", file);
      console.log("File:", formData?.append);
    });

    const coData = { ...data,changeOrder:parseInt(data?.changeOrder) , files, recepient_id: recipientID, fabricator_id:fabricatorID };
    console.log("Sending Data:", coData); // Debugging

    try {
      const response = await Service.addCO(coData);
      toast.success("CO created successfully");
      console.log("CO created successfully:", response);
    } catch (error) {
      toast.error("Error creating CO");
      console.error("Error creating CO:", error);
    }
  };

  const addRow = () => {
    const currentRows = watch("rows") || [];
    setValue("rows", [
      ...currentRows,
      { changeDescription: "", reference: "", element: "", qty: "", hours: "", cost: "", remarks: "" },
    ]);
  };

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-x-hidden overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Project Information Section */}
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
                  { label: "Select Recipients", value: "" },
                  ...clientOptions,
                ]}
                {...register("recipient_id", { required: true })}
                onChange={setValue}
              />
              {errors.recipients && <div>This field is required</div>}
            </div>
          </div>

          {/* Details Section */}
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
                {...register("remark", { required: true })}
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
                {...register("changeOrder", {
                  required: true,
                  valueAsNumber: true, // Ensures the value is treated as a number
                })}
              />
              {errors.changeOrder && <div className="text-red-500">This field is required</div>}
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

          {/* Tabular Data Section */}
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Tabular Data:
          </div>
          <div className="overflow-x-auto w-[80vw] my-3">
            <table className="w-full border-collapse border border-gray-300 text-center text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-2 py-1">Sl.No</th>
                  <th className="border border-gray-300 px-2 py-1">Description of Changes</th>
                  <th className="border border-gray-300 px-2 py-1">Reference Drawings/Documents</th>
                  <th className="border border-gray-300 px-2 py-1">Elements</th>
                  <th className="border border-gray-300 px-2 py-1">Qty</th>
                  <th className="border border-gray-300 px-2 py-1">Hours</th>
                  <th className="border border-gray-300 px-2 py-1">Cost ($)</th>
                  <th className="border border-gray-300 px-2 py-1">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.changeDescription`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="textarea"
                            label="Change of Description"
                            placeholder="Change of Description"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.reference`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Reference"
                            placeholder="Reference"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.element`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Element Name"
                            placeholder="Element Name"
                            size="md"
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
                            label="Qty"
                            min="0"
                            placeholder="Qty"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    {/* Other columns for reference, element, qty, hours, cost, and remarks */}
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.hours`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            label="Hours"
                            min="0"
                            placeholder="Hours"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.cost`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            label="Cost"
                            min="0"
                            placeholder="Cost"
                            size="md"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <Controller
                        name={`rows.${index}.remarks`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="textarea"
                            label="Remarks"
                            min="0"
                            placeholder="Remarks"
                            size="md"
                          />
                        )}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5" className="border border-gray-300 px-2 py-1 font-bold text-right">Total</td>
                  <td className="border border-gray-300 px-2 py-1 font-bold">{totalHours}</td>
                  <td className="border border-gray-300 px-2 py-1 font-bold">{totalCost}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button onClick={addRow} color="blue" size="lg" type="button">
            Add Row
          </Button>

          {/* File Upload Section */}
          <div className="my-3">
            <MultipleFileUpload
              label="Select Files"
              onFilesChange={onFilesChange}
              files={files}
              accept="image/*,application/pdf,.doc,.docx"
              {...register("files")}
            />
          </div>

          {/* Submit Button */}
          <Button color="green" size="lg" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendCO;
