/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { Input, Select, Button } from '../../../../index'

const AddFabricatorUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const AddFabricatorUser = (data) => {
    console.log(data)
  }

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(AddFabricatorUser)}>
          <div className="w-full my-2">
            <Input
              label="Fabricator:"
              placeholder="Fabricator"
              size="lg"
              color="blue"
              {...register('username', { required: true })}
            />
            {errors.username && <div>This field is required</div>}
          </div>
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
          <div className="w-full my-2">
            <Input
              label="Email:"
              placeholder="Email"
              size="lg"
              color="blue"
              {...register('email')}
            />
          </div>
          <div className="w-full my-2">
            <Input
              label="Password:"
              placeholder="Password"
              size="lg"
              color="blue"
              {...register('password')}
            />
          </div>
          <div className="w-full my-2">
            <Input
              label="Contact Number:"
              placeholder="Contact Number"
              size="lg"
              color="blue"
              {...register('phone', { required: true })}
            />
            {errors.phone && <div>This field is required</div>}
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
