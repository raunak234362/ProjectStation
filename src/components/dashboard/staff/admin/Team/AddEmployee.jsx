/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Input, CustomSelect, Button, Toggle } from "../../../../index";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, showDepartment } from "../../../../../store/userSlice";
import {
  countries,
  getCountryFlagEmojiFromCountryCode,
} from "country-codes-flags-phone-codes";
import { useState } from "react";
import Service from "../../../../../config/Service";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../../config/constant";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm();
  const [showAlert, setShowalert] = useState(false);
  const [departments, setDepartments] = useState([]);

  const fetchAllDepartments = async () => {
    const departmentData = await Service.allDepartment();
    console.log(departmentData.data);
    setDepartments(departmentData.data);
    dispatch(showDepartment(departmentData));
  };

  console.log(departments);

  const departmentOptions = departments?.map((department) => ({
    label: department.name,
    value: department.id,
  }));

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  const countryOptions = countries.map((country) => ({
    label: `${getCountryFlagEmojiFromCountryCode(country.code)} ${
      country.name
    } (${country.dialCode})`,
    value: country.dialCode,
  }));


  const addStaff = async (data) => {
    console.log(data);
    if (data.password !== data.cnf_password) {
      setShowalert(true);
      return;
    }
    clearErrors("cnf_password");
    const phoneNumber = `${data.country_code}${data.phone}`;
    const updatedData = {
      ...data,
      emp_code: data.emp_code.toUpperCase(),
      username: data.username.toUpperCase(),
      phone: phoneNumber,
    };
    try {
      const empData = await Service.addEmployee(updatedData, token);
      toast.success("Employee added successfully");
      dispatch(setUserData(empData.data));
    } catch (error) {
      toast.error("Failed to add employee");
      console.error("Error adding employee:", error);
      alert(error.response.message);
    }
  };

  return (
    <div className="flex justify-center w-full text-black">
      <div className="w-full h-full px-2 py-3 bg-white overflow-y-auto md:px-10">
        <form onSubmit={handleSubmit(addStaff)}>
          <div className="px-2 py-2 font-bold text-white rounded-lg bg-teal-500/50">
            User Informations:
          </div>
          <div className="px-1 my-2 md:px-2">
            <div className="w-full my-2">
              <Input
                label="Username:"
                placeholder="Username"
                size="lg"
                color="blue"
                name="username"
                {...register("username", { required: true })}
              />
              {errors.username && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
              <Input
                label="First Name:"
                placeholder="First Name"
                size="lg"
                color="blue"
                {...register("f_name", { required: true })}
              />
              {errors.f_name && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
              <Input
                label="Middle Name:"
                placeholder="Middle Name"
                size="lg"
                color="blue"
                name="m_name"
                {...register("m_name")}
              />
            </div>
            <div className="w-full my-2">
              <Input
                label="Last Name:"
                placeholder="Last Name"
                size="lg"
                color="blue"
                name="l_name"
                {...register("l_name")}
              />
            </div>
          </div>
          <div className="px-2 py-2 font-bold text-white rounded-lg bg-teal-500/50">
            User Department Details:
          </div>
          <div className="px-1 my-2 md:px-2">
            <div className="w-full my-2">
              <Input
                label="Employee Code:"
                placeholder="Employee Code"
                size="lg"
                color="blue"
                name="emp_code"
                {...register("emp_code", { required: true })}
              />
              {errors.emp_code && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
              <CustomSelect
                label="Department:"
                color="blue"
                name="department"
                options={departmentOptions}
                className="w-full"
                {...register("department")}
                onChange={setValue}
              />
            </div>

            <div className="grid px-5 bg-white border border-gray-400 rounded-lg md:grid-cols-2 md:w-full md:justify-center md:items-center">
              <div className="">
                <Toggle
                  label="Project Manager"
                  name="manager"
                  {...register("is_manager")}
                />
              </div>

              <div className="">
                <Toggle
                  label="Sales Employee"
                  name="sales"
                  {...register("is_sales")}
                />
              </div>
            </div>
          </div>
          <div className="px-2 py-2 font-bold text-white rounded-lg bg-teal-500/50">
            Contact Information:
          </div>
          <div className="px-1 my-2 md:px-2">
            <div className="w-full my-2">
              <Input
                label="Email:"
                placeholder="Email"
                size="lg"
                color="blue"
                name="email"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col items-center w-full gap-2 my-2 md:flex-row">
              <div className="md:w-[10%] w-full">
                <CustomSelect
                  label="Country Code:"
                  color="blue"
                  name="country_code"
                  options={countryOptions}
                  onChange={setValue}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Contact Number:"
                  placeholder="Contact Number"
                  size="lg"
                  color="blue"
                  {...register("phone", { required: true })}
                />
                {errors.phone && <div>This field is required</div>}
              </div>
            </div>
          </div>
          {/* <div className="px-2 py-2 font-bold text-white rounded-lg bg-teal-500/50">
            Security:
          </div>
          <div className="px-1 my-2 md:px-2">
            <div className="w-full my-2">
              <Input
                label="Password:"
                placeholder="Password"
                type="password"
                size="lg"
                color="blue"
                {...register("password")}
              />
            </div>
            <div className="w-full my-2">
              <Input
                label="Confirm Password:"
                type="password"
                placeholder="Confirm Password"
                size="lg"
                color="blue"
                {...register("cnf_password")}
              />
            </div>
          </div>
          {showAlert && (
            <div className="px-2 py-2 font-bold text-white rounded-lg bg-red-500/50">
              Passwords do not match
            </div>
          )} */}

          <div className="w-full my-5">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
