/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../../../../fields/Input";
import Button from "../../../../fields/Button";
import Service from "../../../../../config/Service";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const EditEmployee = ({ employee, onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      f_name: employee?.f_name || "",
      m_name: employee?.m_name || "",
      l_name: employee?.l_name || "",
      phone: employee?.phone || "",
      username: employee?.username || "",
      emp_code: employee?.emp_code || "",
      email: employee?.email || "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
        const response = await Service.editEmployee(employee?.id, data);
        toast.success("Employee updated successfully");
        console.log("Employee updated successfully:", response);
        onClose();
        } catch (error) {
            toast.error("Failed to update employee");
        console.error("Failed to update employee:", error);
        }
  };

  console.log("Employee", employee);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-fit overflow-y-auto p-5 md:p-5 rounded-lg shadow-lg w-11/12 md:w-6/12 ">
        <div className="flex justify-between my-5 bg-teal-200/50 p-2 rounded-lg">
          <h2 className="text-2xl font-bold">Edit Employee</h2>
          <button
            className="text-xl font-bold bg-teal-500/50 hover:bg-teal-700 text-white px-5 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Input
                label="Username:"
                type="text"
                placeholder="Username"
                defaultValues={employee?.username}
                {...register("username")}
                />
            </div>
            <div>
                <Input
                label="Employee Code:"
                type="text"
                placeholder="Employee Code"
                defaultValues={employee?.emp_code}
                {...register("emp_code")}
                />
            </div>
            <div>
                <Input
                label="First Name:"
                type="text"
                placeholder="First Name"
                defaultValues={employee?.f_name}
                {...register("f_name")}
                />
            </div>
            <div>
                <Input
                label="Middle Name:"
                type="text"
                placeholder="Middle Name"
                defaultValues={employee?.m_name}
                {...register("m_name")}
                />
            </div>
            <div>
                <Input
                label="Last Name:"
                type="text"
                placeholder="Last Name"
                defaultValues={employee?.l_name}
                {...register("l_name")}
                />
            </div>
            <div>
                <Input
                label="Phone number:"
                type="text"
                placeholder="Phone number"
                defaultValues={employee?.phone}
                {...register("phone")}
                />
            </div>
            <div>
                <Input
                label="Email:"
                type="text"
                placeholder="Email"
                defaultValues={employee?.email}
                {...register("email")}
                />
            </div>
            <div>
                <Button type="submit">Edit Employee</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
