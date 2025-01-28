/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Button, Input } from "../../../../index";
import Service from "../../../../../config/Service";

const AddFiles = ({ projectId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const handleFileChange = (e) => {
  //     const file = e.target.files;

  //     setFormData((prevState) => ({
  //       ...prevState,
  //       csv_upload: file,
  //     }));
  //   };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Ensure data?.files is an array and has files
    if (data?.files?.length) {
      // Append files to FormData
      for (let i = 0; i < data.files.length; i++) {
        console.log("File data:", data.files[i]);
        formData.append("files", data.files[i]);
      }

      // Log the formData content by iterating over its entries
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      try {
        const response = await Service.addProjectFile(formData, projectId);
        console.log("Files uploaded successfully:", response);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      console.error("No files to upload.");
    }
  };

  return (
    <div className="my-5">
      <div className="bg-teal-200/30 h-[93%] md:p-2 rounded-lg shadow-lg w-full ">
        <div className="flex w-full justify-center font-bold my-2">
          Upload Files
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="file"
            name="files"
            label="Upload Files"
            placeholder="Upload Files"
            size="lg"
            accept=" image/* .zip .rar .iso"
            {...register("files")}
          />
          {errors.files && (
            <div className="text-red-500">This field is required</div>
          )}
          <div className="my-2 w-full justify-center flex">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFiles;
