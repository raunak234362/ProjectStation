/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { State, City } from 'country-state-city'
import { Input, Select, Button, Toggle } from '../../../../index'
import { useEffect, useState } from 'react'
const AddFabricator = () => {
  const dispatch = useDispatch()
  // console.log(projectData)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [stateList, setStateList] = useState([
    {
      label: 'Select State',
      value: '',
    },
  ])

  const [cityList, setCityList] = useState([
    {
      label: 'Select City',
      value: '',
    },
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
      ),
    )
  }, [state])

  const AddFabricator = (data) => {
    // dispatch()
    console.log(data)
  }


  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(AddFabricator)}>
          <div className="w-full">
            <Input
              label="Fabricator Name:"
              placeholder="Fabricator Name"
              size="lg"
              color="blue"
              {...register('name', { required: true })}
            />
            {errors.name && <div>This field is required</div>}
          </div>
          <div className="w-full my-2">
            <Input
              label="Address:"
              placeholder="Address"
              size="lg"
              color="blue"
              {...register('address')}
            />
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
              {...register('country', { required: 'Country is required' })}
              // onChange={(e) => setCountry(e.target.value)}
              onChange={setValue}
            />
            {errors.country && (
              <p className="text-red-600">{errors.country.message}</p>
            )}
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
              // onChange={(e) => setState(e.target.value)}
              onChange={setValue}
            />
            {/* {errors.state && (
              <p className="text-red-600">{errors.state.message}</p>
            )} */}
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
            {/* {errors.city && (
              <p className="text-red-600">{errors.city.message}</p>
            )} */}
          </div>
          <div className="my-2">
            <Input
              label="Zipcode: "
              placeholder="Zipcode"
              className="w-full"
              {...register('zipCode')}
            />
            {/* {errors.zipCode && (
              <p className="text-red-600">{errors.zipCode.message}</p>
            )} */}
          </div>

          <div className="w-full my-3">
            <Input
              type="textarea"
              label="Description:"
              placeholder="Description"
              size="lg"
              color="blue"
              {...register('description', { required: true })}
            />
            {errors.description && <div>This field is required</div>}
          </div>
        
          

          <div className="my-5 w-full">
            <Button type="submit" className="w-full">
              Add Fabricator
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFabricator
