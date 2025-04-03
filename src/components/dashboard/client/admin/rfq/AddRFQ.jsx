/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  CustomSelect,
  Button,
  Toggle,
  MultipleFileUpload,
} from "../../../../index";
import Service from "../../../../../config/Service";
import { toast } from "react-toastify";
import { showStaff } from "../../../../../store/userSlice";

const AddRFQ = () => {
  
  const dispatch = useDispatch();

  const fetchAllStaff = async () => {
    const staffData = await Service.allEmployee(token);
    // const departmentData = await Service.allDepartment(token);
    console.log(departmentData);
    // dispatch(showDepartment(departmentData));
    dispatch(showStaff(staffData));
  };

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const staffData = useSelector((state) => state?.userData?.staffData) || [];
  
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);
  
  const recipientID = watch("recipient_id");
  
  
  const recipientOptions = staffData?.map((recipient) => ({
    label: `${recipient.f_name} ${recipient.l_name}`,
    value: recipient.id,
  }));
  
  console.log("Selected Recipient ID:", recipientOptions);
  
  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };


  const CreateRFQ = async (data) => {
    console.log("Form Data:", data); // Debugging
    const formData = new FormData();

    // Append files
    files?.map((file) => {
      formData.append("files", file);
      console.log("File:", formData?.append);
    });

    const RFQData = { ...data, files, recepient_id: recipientID };
    console.log("Sending Data:", RFQData); // Debugging

    try {
      const response = await Service.addRFQ(RFQData);
      toast.success("RFQ created successfully");
      console.log("RFQ created successfully:", response);
    } catch (error) {
      toast.error("Error creating RFQ");
      console.error("Error creating RFQ:", error);
    }
  };

  return (
    <div className="flex justify-center w-full my-5 text-black">
      <div className="w-full h-full px-2 py-3 overflow-y-auto md:px-10">
        <form onSubmit={handleSubmit(CreateRFQ)}>
          <div className="px-2 py-2 font-bold text-white rounded-lg bg-teal-500/50">
            Project Information:
          </div>
          <div className="px-1 my-2 md:px-2">
            <div className="w-full mt-3">
              <Input
                label="Project Name:"
                placeholder="Project Name:"
                size="lg"
                color="blue"
                {...register("project", { required: true })}
              />
              {errors.project && <div>This field is required</div>}
            </div>
            
          </div>
          <div className="px-2 py-2 font-bold text-white rounded-lg bg-teal-500/50">
            Details:
          </div>
          <div className="px-1 my-2 md:px-2">
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
          <div className="px-2 py-2 font-bold text-white rounded-lg bg-teal-500/50">
            Attach Files:
          </div>
          <div className="px-1 my-2 md:px-2">
            <MultipleFileUpload
              label="Select Files"
              onFilesChange={onFilesChange}
              files={files}
              accept="image/*,application/pdf,.doc,.docx"
              {...register("files")}
            />
          </div>

          <div className="w-full my-5">
            <Button type="submit">Send Request</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRFQ;
