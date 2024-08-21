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
  const dispatch= useDispatch();


  console.log(userdata)

  return (
    <div className="text-xl md:text-6xl text-green-500 p-5 md:p-10">
      project
    </div>
  )
}

export default AddProject
