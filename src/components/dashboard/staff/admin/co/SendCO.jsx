/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Input,
  CustomSelect,
  Button,
  MultipleFileUpload,
} from "../../../../index"; // Assuming these components are imported from your own library
import { useForm } from "react-hook-form";

const SendCO = () => {
  const [files, setFiles] = useState([]);
  const [rows, setRows] = useState([{ slNo: "", description: "", reference: "", element: "", qty: "", hours: "", cost: "", remarks: "" }]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle file selection changes
  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    console.log(data);
    // Dispatch form data to your store or API endpoint
    // dispatch(addRFI(data)) or similar
  };

  // Calculate total hours and cost when rows data changes
  useEffect(() => {
    const hoursSum = rows.reduce((sum, row) => sum + (parseFloat(row.hours) || 0), 0);
    const costSum = rows.reduce((sum, row) => sum + (parseFloat(row.cost) || 0), 0);

    setTotalHours(hoursSum);
    setTotalCost(costSum);
  }, [rows]);

  // Update a specific row in the table
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Add a new row to the table
  const addRow = () => {
    setRows([...rows, { slNo: "", description: "", reference: "", element: "", qty: "", hours: "", cost: "", remarks: "" }]);
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
                label="Select CO# Project:"
                color="blue"
                size="lg"
                name="fabricator"
                options={[
                  { label: "Select CO# Project", value: "" },
                  { label: "Project-1 | Add column", value: "Fabricator 1" },
                  { label: "Project-2 | Add column", value: "Fabricator 2" },
                ]}
                {...register("project", { required: true })}
                onChange={setValue}
              />
              {errors.fabricator && <div className="text-red-500">This field is required</div>}
            </div>
            <div className="w-full mt-2">
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
              {errors.recipients && <div className="text-red-500">This field is required</div>}
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
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="text"
                        placeholder="Description"
                        size="sm"
                        value={row.description}
                        {...register("description")}
                        onChange={(e) => handleRowChange(index, "description", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="text"
                        placeholder="Reference"
                        size="sm"
                        value={row.reference}
                        onChange={(e) => handleRowChange(index, "reference", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="text"
                        placeholder="Element Name"
                        size="sm"
                        value={row.element}
                        onChange={(e) => handleRowChange(index, "element", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="number"
                        placeholder="Qty"
                        size="sm"
                        value={row.qty}
                        onChange={(e) => handleRowChange(index, "qty", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="number"
                        placeholder="Hours"
                        size="sm"
                        value={row.hours}
                        onChange={(e) => handleRowChange(index, "hours", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="number"
                        placeholder="Cost"
                        size="sm"
                        value={row.cost}
                        onChange={(e) => handleRowChange(index, "cost", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="text"
                        placeholder="Remarks"
                        size="sm"
                        value={row.remarks}
                        onChange={(e) => handleRowChange(index, "remarks", e.target.value)}
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
            />
          </div>

          <Button type="submit" color="teal" size="lg" fullWidth>
            Send CO
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendCO;
