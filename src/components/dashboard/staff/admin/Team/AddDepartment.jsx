/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Input, CustomSelect, Button } from "../../../../index";
import { useEffect, useState } from "react";
import Service from "../../../../../config/Service";
import { useDispatch } from "react-redux";
import { addDepartment } from "../../../../../store/userSlice";

const AddDepartment = () => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [managerOptions, setManagerOptions] = useState([]);
  const token = sessionStorage.getItem("token");
  // Fetch managers when the component mounts
  const fetchManagers = async () => {
    try {
      // Fetching the user data
      const userData = await Service?.allEmployee(token);
      console.log(userData);
      const options = Array.isArray(userData?.data)
        ? userData?.data
            .filter((user) => user.is_manager === true)
            .map((user) => {
              return {
                label: `${user.f_name} ${user.l_name}`,
                value: user.id,
              };
            })
        : [];
      console.log(options);
      setManagerOptions(options);
    } catch (error) {
      console.error("Failed to fetch employee data", error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  // Add department function
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const departmentData = await Service.addDepartment(data);

      dispatch(addDepartment(departmentData.data));
      console.log("Department added successfully:", departmentData);
    } catch (error) {
      console.log("Failed to add department", error);
    }
  };

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Department:
          </div>

          <div className="my-2 md:px-2 px-1">
            <div className="w-full">
              <Input
                label="Department Name:"
                placeholder="Enter Department Name"
                size="lg"
                color="blue"
                {...register("name", { required: true })} // Registering department name
              />
              {errors.name && (
                <div className="text-red-500">This field is required</div>
              )}
            </div>

            <div className="w-full mt-4">
              <CustomSelect
                label="Manager:"
                color="blue"
                options={[
                  { label: "Select Manager", value: "" },
                  ...managerOptions,
                ]}
                {...register("manager")}
                onChange={setValue}
              />
              {errors.manager && (
                <div className="text-red-500">This field is required</div>
              )}
            </div>
          </div>

          <div className="my-5 w-full">
            <Button type="submit" className="w-full">
              Add Department
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
