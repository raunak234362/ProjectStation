/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Select, Button } from '../../../../index'
import { addProject } from '../../../../../store/projectSlice'
const AddProject = () => {
  const projectData = useSelector((state) => state.projectData)
  const dispatch = useDispatch()
  console.log(projectData)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const AddProject = (data) => {
    console.log(data)
    dispatch(addProject(data))
    console.log(addProject(data))
  }

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="w-full px-10">
        <form onSubmit={handleSubmit(AddProject)}>
          <div className="w-full">
            <Input
              label="Project Name:"
              placeholder="Project Name"
              size="lg"
              color="blue"
              {...register('name', { required: true })}
            />
          </div>
          <div className="w-full my-3">
            <Input
              label="Fabricator Name:"
              placeholder="Fabricator Name"
              size="lg"
              color="blue"
              {...register('fabricator', { required: true })}
            />
          </div>
          <div className="w-full my-3">
            <Input
              label="Description:"
              placeholder="Description"
              size="lg"
              color="blue"
              {...register('description', { required: true })}
            />
          </div>
          <div className="w-full my-3">
            <Input
              label="Fabricator Name:"
              placeholder="Fabricator Name"
              size="lg"
              color="blue"
              {...register('fabricator', { required: true })}
            />
          </div>
          <div className="w-full my-3">
            <Input
              label="Fabricator Name:"
              placeholder="Fabricator Name"
              size="lg"
              color="blue"
              {...register('fabricator', { required: true })}
            />
          </div>
          <Button type="submit">Add Project</Button>
        </form>
      </div>
    </div>
  )
}

export default AddProject
