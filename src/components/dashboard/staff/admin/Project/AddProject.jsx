/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const AddProject = () => {
  const userdata = useSelector((state) => state.userData.userData)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()

  console.log(userdata)

  return (
      <div className="flex justify-center items-center text-white">
        <div className='text-xl md:text-3xl px-5 py-1 m-5 md:m-5 bg-gray-800 rounded-xl'>Add project</div>
      </div>
  )
}

export default AddProject
