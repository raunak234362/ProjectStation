/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
  const [rows, setRows] = useState([{ slNo: "", description: "", reference: "", element: "", qty: "", hours: "", cost: "", remarks: "" }]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
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


  // Calculate totals whenever rows data changes
  useEffect(() => {
    const hoursSum = rows.reduce((sum, row) => sum + (parseFloat(row.hours) || 0), 0);
    const costSum = rows.reduce((sum, row) => sum + (parseFloat(row.cost) || 0), 0);

    setTotalHours(hoursSum);
    setTotalCost(costSum);
  }, [rows]);

   // Update a specific row
   const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Add a new row
  const addRow = () => {
    setRows([...rows, { slNo: "", description: "", reference: "", element: "", qty: "", hours: "", cost: "", remarks: "" }]);
  };

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-x-hidden overflow-y-auto md:px-10 px-2 py-3">
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
          <div className="overflow-x-auto w-[80vw] my-3">
            <table className="w-full border-collapse border border-gray-300 text-center text-sm ">
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
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="number"
                        label="Sl.No"
                        placeholder="Sl.No"
                        size="sm"
                        value={row.slNo}
                        onChange={(e) => handleRowChange(index, "slNo", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="text"
                        label="Description"
                        placeholder="Description"
                        size="sm"
                        value={row.description}
                        onChange={(e) => handleRowChange(index, "description", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="text"
                        label="Reference"
                        placeholder="Reference"
                        size="sm"
                        value={row.reference}
                        onChange={(e) => handleRowChange(index, "reference", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="text"
                        label="Element Name"
                        placeholder="Element Name"
                        size="sm"
                        value={row.element}
                        onChange={(e) => handleRowChange(index, "element", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="number"
                        label="Qty"
                        placeholder="Qty"
                        size="sm"
                        value={row.qty}
                        onChange={(e) => handleRowChange(index, "qty", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="number"
                        label="Hours"
                        placeholder="Hours"
                        size="sm"
                        value={row.hours}
                        onChange={(e) => handleRowChange(index, "hours", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="number"
                        label="Cost"
                        placeholder="Cost"
                        size="sm"
                        value={row.cost}
                        onChange={(e) => handleRowChange(index, "cost", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Input
                        type="text"
                        label="Remarks"
                        placeholder="Remarks"
                        size="sm"
                        value={row.remarks}
                        onChange={(e) => handleRowChange(index, "remarks", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5" className="border border-gray-300 px-2 py-1 font-bold text-right">
                    Total
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <Input
                      type="number"
                      value={totalHours}
                      readOnly
                      size="sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <Input
                      type="number"
                      value={totalCost}
                      readOnly
                      size="sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add Row Button */}
          <div className="flex justify-end">
            <Button type="button" onClick={addRow}>
              Add Row
            </Button>
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
