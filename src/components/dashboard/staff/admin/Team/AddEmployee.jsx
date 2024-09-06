/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { Input, Select, Button, Toggle } from '../../../../index'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../../../../store/userSlice'
import { countries, getCountryFlagEmojiFromCountryCode } from "country-codes-flags-phone-codes"
import { useState } from 'react'

const AddEmployee = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()

  const countryOptions = [
    ...countries.map((country) => ({
      label: `${getCountryFlagEmojiFromCountryCode(country.code)} ${country.name} (${country.dialCode})`,
      value: country.dialCode,
    })),
  ]

  const AddEmployee = (data) => {
    const phoneNumber = `${data?.country_code}${data?.phone}`
    console.log(phoneNumber)

    const updatedData = {
      ...data,
      phone: phoneNumber,
    }

    console.log(updatedData)
    dispatch(setUserData(updatedData))
  }

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(AddEmployee)}>
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
                {...register('m_name')}
              />
            </div>
            <div className="w-full my-2">
              <Input
                label="Last Name:"
                placeholder="Last Name"
                size="lg"
                color="blue"
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
                {...register('emp_code', { required: true })}
              />
              {errors.emp_code && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
              <Input
                label="Department:"
                placeholder="Department"
                size="lg"
                color="blue"
                {...register('department')}
              />
            </div>
            <div className="w-full my-2">
              <Input
                label="Designation:"
                placeholder="Designation"
                size="lg"
                color="blue"
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
                  onChange={setValue} // Update country_code field
                  // {...register('country_code', { required: true })}
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