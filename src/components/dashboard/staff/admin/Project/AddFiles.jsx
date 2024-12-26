import { useForm } from "react-hook-form";
import {  Button, Input } from "../../../../index";

const AddFiles = () => {
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
    console.log(data);
  };

  return (
    <div>
      <h1>Upload Files</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="file"
          label="Upload Files"
          placeholder="Upload Files"
          size="lg"
          {...register("files")}
        />
        {errors.files && (
          <div className="text-red-500">This field is required</div>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddFiles;
