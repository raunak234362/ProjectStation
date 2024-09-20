/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { Input, Select, Button } from '../../../../index'
import { useDispatch, useSelector } from 'react-redux'
import { addClient } from '../../../../../store/fabricatorSlice'
import {
  countries,
  getCountryFlagEmojiFromCountryCode,
} from 'country-codes-flags-phone-codes'
import Service from '../../../../../config/Service'
import { useEffect, useState } from 'react'
import { City, State } from 'country-state-city'

const AddFabricatorUser = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const fabricators = useSelector(
    (state) => state?.fabricatorData?.fabricatorData,
  )

  const countryOptions = countries.map((country) => ({
    label: `${getCountryFlagEmojiFromCountryCode(country.code)} ${
      country.name
    } (${country.dialCode})`,
    value: country.dialCode,
  }))

  const country = watch('country')
  const state = watch('state')
  const [stateList, setStateList] = useState([
    { label: 'Select State', value: '' },
  ])
  const [cityList, setCityList] = useState([
    { label: 'Select City', value: '' },
  ])

  const countryList = {
    'United States': 'US',
    Canada: 'CA',
    India: 'IN',
  }

  useEffect(() => {
    const stateListObject = {}
    State.getStatesOfCountry(countryList[country])?.forEach((state1) => {
      stateListObject[state1.name] = state1.isoCode
    })
    setStateList(stateListObject)
  }, [country])

  useEffect(() => {
    setCityList(
      City.getCitiesOfState(countryList[country], stateList[state])?.map(
        (city) => ({
          label: city?.name,
          value: city?.name,
        }),
      ) || [],
    )
  }, [state])



  const AddFabricatorUser = async (data) => {
    try {
      const phoneNumber = `${data?.country_code}${data?.phone}`
      const updatedData = {
        ...data,
        phone: phoneNumber,
      }
      console.log(updatedData)
      const clientUser = await Service.addClient(updatedData)
      if (clientUser.status === 201){
        dispatch(addClient(clientUser.data))
        reset()
      } else {
        alert('Error in adding Client')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(AddFabricatorUser)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            User Fabricator Details:
          </div>
          <div className="my-2 px-1 md:px-2">
            <div className="w-full my-2">
              <Select
                label="Fabricator:"
                placeholder="Fabricator"
                size="lg"
                color="blue"
                options={fabricators.map((fabricator) => ({
                  label: fabricator.name,
                  value: fabricator.id,
                }))}
                {...register('fabricator', { required: true })}
                onChange={setValue}
              />
              {errors.fabricator && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
              <Input
                label="User Designation:"
                placeholder="User Designation"
                size="lg"
                color="blue"
                {...register('designation', {
                  required: 'User designation is required',
                })}
              />
              {errors.designation && <div>This field is required</div>}
            </div>
            <div className="my-2">
              <Select
                label="Country: "
                placeholder="Country"
                className="w-full"
                options={[
                  { label: 'Select Country', value: '' },
                  ...Object.keys(countryList).map((country) => ({
                    label: country,
                    value: country,
                  })),
                ]}
                {...register('country')}
                onChange={setValue}
              />
            </div>
            <div className="my-2">
              <Select
                label="State: "
                placeholder="State"
                className="w-full"
                options={[
                  { label: 'Select State', value: '' },
                  ...Object.keys(stateList).map((state1) => ({
                    label: state1,
                    value: state1,
                  })),
                ]}
                {...register('state')}
                onChange={setValue}
              />
            </div>
            <div className="my-2">
              <Select
                label="City: "
                placeholder="City"
                className="w-full"
                options={[{ label: 'Select City', value: '' }, ...cityList]}
                {...register('city')}
                onChange={setValue}
              />
            </div>
            <div className="my-2">
              <Input
                label="Zipcode: "
                placeholder="Zipcode"
                className="w-full"
                {...register('zip_code')}
              />
            </div>
          </div>
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
            <div className="w-full my-2">
              <Input
                label="Alternate Number:"
                placeholder="Alternate Number"
                size="lg"
                color="blue"
                {...register('alt_phone')}
              />
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

export default AddFabricatorUser
