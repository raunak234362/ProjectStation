/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { State, City } from 'country-state-city'
import { Input, Select, Button, Toggle, MultipleFileUpload } from '../../../../index'
import { useEffect, useState } from 'react'
import { addFabricator } from '../../../../../store/fabricatorSlice'
import Service from '../../../../../config/Service'
const AddFabricator = () => {
  const token = sessionStorage.getItem('token')
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch()
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const country = watch('country')
  const state = watch('state')
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

  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };

  const handleaddFabricator = async (data) => {
    try {
      const fabData = await Service.addFabricator(token, data)
      if (fabData.status === 201){ 
        dispatch(addFabricator(fabData.data))
        reset();
      }
      else
        alert('Error in adding Fabricator')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(handleaddFabricator)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Fabricator:
          </div>
          <div className="my-2 md:px-2 px-1">
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
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Location:
          </div>
          <div className="my-2 md:px-2 px-1">
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
                {...register('state', { required: true })}
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
                {...register('city', { required: true })}
                onChange={setValue}
              />
              {errors.city && (
                <p className="text-red-600">{errors.city.message}</p>
              )}
            </div>
            <div className="my-2">
              <Input
                label="Zipcode: "
                placeholder="Zipcode"
                className="w-full"
                {...register('zip_code', { required: true })}
              />
              {errors.zip_code && (
                <p className="text-red-600">{errors?.zipCode?.message}</p>
              )}
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Website:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="my-2">
              <Input
                label="Website: "
                type="url"
                placeholder="Website"
                className="w-full"
                {...register('website')}
              />
            </div>
            <div className="my-2">
              <Input
                label="Drive: "
                type="url"
                placeholder="Drive"
                className="w-full"
                {...register('drive')}
              />
            </div>
          </div>

          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Attach Files:
          </div>
          <div className="my-2 md:px-2 px-1">
            <MultipleFileUpload {...register("file")} onFilesChange={onFilesChange} />
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
