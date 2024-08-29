/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Select, Button } from '../../../../index'
import { addProject } from '../../../../../store/projectSlice'
import { textarea } from '@material-tailwind/react'
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
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
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
            type='textarea'
              label="Description:"
              placeholder="Description"
              size="lg"
              color="blue"
              {...register('description', { required: true })}
            />
          </div>
          <div className="w-full my-3">
            <Input
              label="Department:"
              placeholder="Department"
              size="lg"
              color="blue"
              {...register('department', { required: true })}
            />
          </div>
          <div className="w-full my-3">
            <Input
              label="Team:"
              placeholder="Team"
              size="lg"
              color="blue"
              {...register('team', { required: true })}
            />
          </div>
          <div className="w-full my-3">
            <Input
              label="Manager:"
              placeholder="Manager"
              size="lg"
              color="blue"
              {...register('manager', { required: true })}
            />
          </div>
          <div className="w-full my-3">
            <Select
              label="Status"
              size="lg"
              color="blue"
              options={[
                {
                  label: 'Select Status',
                  value: '',
                },
                { label: 'ACTIVE', value: 'ACTIVE' },
                { label: 'ON-HOLD', value: 'ON-HOLD' },
                { label: 'INACTIVE', value: 'INACTIVE' },
                { label: 'DELAY', value: 'DELAY' },
                { label: 'COMPLETE', value: 'COMPLETE' },
              ]}
              {...register('status')}
            />
          </div>
          <div className="w-full my-3">
            <Select
              label="Stage"
              size="lg"
              color="blue"
              options={[
                {
                  label: 'Select Stage',
                  value: '',
                },
                { label: 'Request for Information', value: 'RFI' },
                { label: 'Issue for Approval', value: 'IFA' },
                { label: 'Back from Approval', value: 'BFA' },
                { label: 'Back from Approval - Markup', value: 'BFA-M' },
                { label: 'Re-issue for Approval', value: 'RIFA' },
                { label: 'Return Back from Approval', value: 'RBFA' },
                { label: 'Issue for Construction', value: 'IFC' },
                { label: 'Back from Construction', value: 'BFC' },
                { label: 'Re-issue for Construction', value: 'RIFC' },
                { label: 'Revision', value: 'REV' },
                { label: 'Change Order', value: 'CO#' },
              ]}
            />
          </div>
          <div className="w-full my-3">
            <Select
              label="Tools:"
              size="md"
              color="blue"
              name="tool"
              options={[
                {
                  label: 'Select Tools',
                  value: '',
                },
                { label: 'TEKLA', value: 'TEKLA' },
                { label: 'SDS-2', value: 'SDS-2' },
              ]}
              className="w-full"
              {...register('tool', {
                required: 'Tools is required',
              })}
            />
          </div>
          <Button type="submit">Add Project</Button>
        </form>
      </div>
    </div>
  )
}

export default AddProject
