/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {Input, Select, Button} from '../../../../index'

const AddProject = () => {
  const userdata = useSelector((state) => state.userData.userData)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()

  const addProject = async ()=>{

  }

  console.log(userdata)

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className='w-full px-10'>
        <form action={handleSubmit(addProject)}>
          <div className='w-full'>
            <Input
              label='Project Name:'
              placeholder='Project Name'
              size='lg'
              color='blue'
              // {...register('projectName', { required: true })}
            />
          </div>
          <div className='w-full mt-3'>
            <Input
              label='Fabricator Name:'
              placeholder='Fabricator Name'
              size='lg'
              color='blue'
              // {...register('projectName', { required: true })}
            />
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddProject
