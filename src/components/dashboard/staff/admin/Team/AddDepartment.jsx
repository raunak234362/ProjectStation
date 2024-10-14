/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Input, Select, Button } from "../../../../index";
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
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [managerOptions, setManagerOptions] = useState([]);

  // Fetch managers when the component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const userData = await Service.allEmployee(token);
        console.log(userData)
        const managers = userData.filter(
          (employee) => employee.manager === true
        );
        console.log(managers);
        const options = managers.map((mng) => ({
          label: mng.username,
          value: mng.id,
        }));
        setManagerOptions(options);
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };
    fetchManagers();
  }, [token]);

  // Add department function
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const departmentData = await Service.addDepartment(token, data);
      if (departmentData.status === 201) {
        dispatch(addDepartment(departmentData.data));
        console.log("Department added successfully:", departmentData);
      } else {
        alert("Error in adding Department");
      }
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
              <Select
                label="Manager:"
                color="blue"
                options={[
                  { label: "Select Manager", value: "" }, 
                  ...managerOptions, 
                ]}
                {...register("manager")} 
                onChange={(e) => setValue("manager", e.target.value)} 
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
