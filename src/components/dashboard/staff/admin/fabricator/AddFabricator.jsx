/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Input, Select, Button, Toggle } from '../../../../index'
const AddFabricator = () => {
  const dispatch = useDispatch()
  // console.log(projectData)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit()}>
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
          <div className="w-full my-3">
            <Select
              label="Tools:"
              color="blue"
              name="tool"
              options={[
                { label: 'Select Tools', value: '' },
                { label: 'TEKLA', value: 'TEKLA' },
                { label: 'SDS-2', value: 'SDS-2' },
              ]}
              className="w-full"
              {...register('tools')}
              onChange={setValue}
            />
            {errors.tool && <div>This field is required</div>}
          </div>

          <div>
            <div className="text-sm w-full font-bold mt-2 text-gray-800">
              Connection Design:
            </div>
            <div className="grid md:grid-cols-3 bg-white px-5 md:w-full md:justify-center rounded-xl">
              <div className="">
                <Toggle
                  label="Main Design"
                  name="connectionDesign"
                  {...register('connectionDesign')}
                />
              </div>
              <div className="">
                <Toggle
                  label="Misc Design"
                  name="miscDesign"
                  {...register('miscDesign')}
                />
              </div>
              <div className="">
                <Toggle
                  label="Customer Design"
                  name="customer"
                  {...register('customer')}
                />
              </div>
            </div>
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
