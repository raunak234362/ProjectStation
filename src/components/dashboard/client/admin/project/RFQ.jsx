/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import MultipleFileUpload from "../../../../fields/MultipleFileUpload";
import Input from "../../../../fields/Input";
import { CustomSelect } from "../../../..";
import { Button } from "@material-tailwind/react";

const RFQ = () => {
  const dispatch = useDispatch();
  // console.log(projectData);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);

  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };
  const onSubmit = async (data) => {
    console.log(data);
    const formData = { ...data, files };
    console.log("data==========================", formData);
    // const response = await Service.addRFI(formData);
  };
  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Project Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full mt-3">
              <Input
                label="Project Name:"
                placeholder="Project Name"
                color="blue"
                size="lg"
                name="project"
                {...register("project", { required: true })}
              />
              {errors.project && <div>This field is required</div>}
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

export default RFQ;
