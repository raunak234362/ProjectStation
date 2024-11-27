/* eslint-disable no-unused-vars */
import Service from '../../../config/Service'
import { useForm } from 'react-hook-form'
import { Input, Button, Header } from '../../index'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../../store/userSlice'
import { nameExtractor } from '../../../util'
/* eslint-disable react/prop-types */
const ChangePassword = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [error, setError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const token = sessionStorage.getItem('token')

  const fetchUser = async () => {
    try {
      const User = await Service.getCurrentUser(token)
      setUser(User[0])
      console.log(User[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const handlePasswordChange = async (data) => {
    const cngPassword = await Service.changePassword(token, data)
    console.log(cngPassword)
    if (cngPassword.status == 200) {
      alert(cngPassword.data.success)
      navigate('/dashboard/home')
    } else {
      if ('cnf_password' in cngPassword.response.data)
        errors.cnf_password = cngPassword.response.data.cnf_password
      if ('new_password' in cngPassword.response.data)
        errors.new_password = cngPassword.response.data.new_password
      setError(cngPassword.response.data.non_field_errors)
    }
  }

  return (
    <div className=" h-screen bg-gradient-to-r from-green-300/50 to-teal-300">
      <div className="mx-5 shadow-2xl drop-shadow-lg">
        <Header />
      </div>
      <div className="flex justify-center mt-24 text-sm md:text-xl">
        <div>Welcome to Project Station. <span className='font-font font-bold'>{nameExtractor(user)}</span></div>
      </div>
      <div className="flex h-[80vh] justify-center items-center">
        <div className="bg-white p-4 rounded-md shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>

          <form onSubmit={handleSubmit(handlePasswordChange)}>
            {/* Change password form can go here */}
            <div className="my-3">
              <Input
                label="Old Password:"
                placeholder="OLD PASSWORD"
                type="password"
                {...register('old_password', {
                  required: 'Old Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
            </div>
            {errors.old_password && (
              <p className="text-red-500">{errors.old_password.message}</p>
            )}

            <div className="my-3">
              <Input
                label="New Password:"
                placeholder="NEW PASSWORD"
                type="password"
                {...register('new_password', {
                  required: 'New Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
            </div>
            {errors.new_password && (
              <p className="text-red-500">{errors.new_password.message}</p>
            )}
            <div className="my-3">
              <Input
                label="Confirm New Password:"
                placeholder="CONFIRM NEW PASSWORD"
                type="password"
                {...register('cnf_password', {
                  required: 'Re-enter New Password',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
            </div>
            {errors.cnf_password && (
              <p className="text-red-500">{errors.cnf_password.message}</p>
            )}

            {error && (
              <ul>
                {error?.map((err, index) => (
                  <li className="text-red-500" key={index}>
                    {err}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-center items-center w-full">
              <Button className='w-full' type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
