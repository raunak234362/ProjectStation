/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { Input, Select, Button, Toggle } from '../../../../index'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../../../../store/userSlice'
import {
  countries,
  getCountryFlagEmojiFromCountryCode,
} from 'country-codes-flags-phone-codes'
import { useState } from 'react'
import Service from '../../../../../config/Service'

const AddEmployee = () => {
  const token = sessionStorage.getItem('token')
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm()
  const [showAlert, setShowalert] = useState(false)

  const countryOptions = countries.map((country) => ({
    label: `${getCountryFlagEmojiFromCountryCode(country.code)} ${
      country.name
    } (${country.dialCode})`,
    value: country.dialCode,
  }))

  const addStaff = async (data) => {
    console.log(data)
    if (data.password !== data.cnf_password) {
      setShowalert(true)
      return
    }
    clearErrors('cnf_password')
    const phoneNumber = `${data.country_code}${data.phone}`
    const updatedData = {
      ...data,
      phone: phoneNumber,
    }
    try {
      const empData = await Service.addEmployee(updatedData, token)
      dispatch(setUserData(updatedData))
      console.log(setUserData(updatedData))
    } catch (error) {
      console.error('Error adding employee:', error)
    }
  }

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(addStaff)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            User Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-2">
              <Input
                label="Username:"
                placeholder="Username"
                size="lg"
                color="blue"
                name='username'
                {...register('username', { required: true })}
              />
              {errors.username && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
              <Input
                label="First Name:"
                placeholder="First Name"
                size="lg"
                color="blue"
                {...register('f_name', { required: true })}
              />
              {errors.f_name && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
              <Input
                label="Middle Name:"
                placeholder="Middle Name"
                size="lg"
                color="blue"
                name='m_name'
                {...register('m_name')}
              />
            </div>
            <div className="w-full my-2">
              <Input
                label="Last Name:"
                placeholder="Last Name"
                size="lg"
                color="blue"
                name='l_name'
                {...register('l_name')}
              />
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            User Department Details:
          </div>
          <div className="my-2 px-1 md:px-2">
            <div className="w-full my-2">
              <Input
                label="Employee Code:"
                placeholder="Employee Code"
                size="lg"
                color="blue"
                name='emp_code'
                {...register('emp_code', { required: true })}
              />
              {errors.emp_code && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
            <Select
                label="Department:"
                color="blue"
                name="department"
                options={[
                  { label: 'Select Department', value: '' },
                  { label: 'HR', value: 1 },
                  { label: 'IT', value: 2 },
                ]}
                className="w-full"
                {...register('department')}
                onChange={setValue}
              />
            </div>
            {/* <div>
              <Select
                label="Role:"
                color="blue"
                name="role"
                options={[
                  { label: 'Select Role', value: '' },
                  { label: 'Staff', value: 'STAFF' },
                  { label: 'Client', value: 'CLIENT' },
                  { label: 'Vendor', value: 'VENDOR' },
                ]}
                className="w-full"
                {...register('role')}
                onChange={setValue}
              />
              {errors.role && <div>This field is required</div>}
            </div> */}
            <div className="w-full my-2">
              <Input
                label="Designation:"
                placeholder="Designation"
                size="lg"
                color="blue"
                name='designation'
                {...register('designation', { required: true })}
              />
              {errors.designation && <div>This field is required</div>}
            </div>
            <div className="grid md:grid-cols-2 bg-white border border-gray-400 px-5 md:w-full md:justify-center md:items-center rounded-lg">
              <div className="">
                <Toggle
                  label="Project Manager"
                  name="manager"
                  {...register('manager')}
                />
              </div>
              <div className="">
                <Toggle
                  label="Sales Employee"
                  name="sales"
                  {...register('sales')}
                />
              </div>
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Contact Information:
          </div>
          <div className="my-2 px-1 md:px-2">
            <div className="w-full my-2">
              <Input
                label="Email:"
                placeholder="Email"
                size="lg"
                color="blue"
                name='email'
                {...register('email')}
              />
            </div>
            <div className="w-full gap-2 my-2 flex md:flex-row flex-col items-center">
              <div className="md:w-[10%] w-full">
                <Select
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
                  {...register('phone', { required: true })}
                />
                {errors.phone && <div>This field is required</div>}
              </div>
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Security:
          </div>
          <div className="my-2 px-1 md:px-2">
            <div className="w-full my-2">
              <Input
                label="Password:"
                placeholder="Password"
                type="password"
                size="lg"
                color="blue"
                {...register('password')}
              />
            </div>
            <div className="w-full my-2">
              <Input
                label="Confirm Password:"
                type="password"
                placeholder="Confirm Password"
                size="lg"
                color="blue"
                {...register('cnf_password')}
              />
            </div>
          </div>
          {showAlert && (
            <div className="bg-red-500/50 rounded-lg px-2 py-2 font-bold text-white">
              Passwords do not match
            </div>
          )}

          <div className="my-5 w-full">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee
