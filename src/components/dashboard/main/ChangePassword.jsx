/* eslint-disable no-unused-vars */
import Service from '../../../config/Service'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../../index'
import { useNavigate } from 'react-router-dom'
/* eslint-disable react/prop-types */
const ChangePassword = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const token = sessionStorage.getItem('token')

  const handlePasswordChange = async (data) => {
    const cngPassword = await Service.changePassword(token, data)
    if (cngPassword.status == 200){
        navigate('/dashboard/home')
    } else {
        alert(cngPassword.error);
    }

  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <form onSubmit={handleSubmit(handlePasswordChange)}>
          {/* Change password form can go here */}
          <div>
            <Input
              label="Old Password:"
              placeholder="OLD PASSWORD"
              type="password"
              {...register('old_password', {
                required: 'Old Password is required',
              })}
            />
            {errors.old_password && (
              <p className="text-red-500">{errors.old_password.message}</p>
            )}
          </div>

          <div>
            <Input
              label="New Password:"
              placeholder="NEW PASSWORD"
              type="password"
              {...register('new_password', {
                required: 'New Password is required',
              })}
            />
            {errors.new_password && (
              <p className="text-red-500">{errors.new_password.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Confirm New Password:"
              placeholder="CONFIRM NEW PASSWORD"
              type="password"
              {...register('cnf_password', {
                required: 'Confirm New Password is required',
              })}
            />
            {errors.cnf_password && (
              <p className="text-red-500">{errors.cnf_password.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            
            <button>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
