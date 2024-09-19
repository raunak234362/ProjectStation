/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import LOGO from '../../assets/logo.png'
import Background from '../../assets/background-image.jpg'
import { Input, Button } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { MdLockReset } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { updatetoken as authLogin, setUserData } from '../../store/userSlice'
import AuthService from '../../config/AuthService'
import Service from '../../config/Service'
import { useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = sessionStorage.getItem('token')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const login = async (data) => {
    try {
      const user = await AuthService.login(data)
      if ('token' in user) {
        const token = user.token
        // sessionStorage.setItem('token', )
        const userData = await Service.getCurrentUser(token)
        console.log(userData)
        let userType = ''
        if (userData[0].role === 'STAFF') {
          if (userData[0].is_superuser) {
            userType = 'admin'
          }
          if (userData[0].is_staff) {
            userType = 'wbt-emp'
          } else {
            userType = 'user'
          }
        } else if (userData[0].role === 'CLIENT') {
          userType = 'client'
        } else {
          userType = 'vendor'
        }

        sessionStorage.setItem('userType', userType)
        dispatch(authLogin(user))
        dispatch(setUserData(userData))
        if (userData[0]?.last_login) navigate('/dashboard')
        else navigate('/change-password/')
      } else {
        alert('Invalid Credentials')
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      if (error.message === 'Invalid Credentials') {
        alert('Invalid Credentials')
      } else {
        alert('Could not connect to server')
      }
    }
  }
  const fetchUser = async () => {
    try {
      const User = await Service.getCurrentUser(token)
      dispatch(setUserData(User))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      fetchUser()
  }, [])

  return (
    <div className="">
      <div className="w-screen grid md:grid-cols-2 grid-cols-1 z-10 fixed">
        <div
          className={`md:flex md:my-0 mt-10 md:h-screen justify-center items-center`}
        >
          <div className="fixed bg-white md:w-auto bg-opacity-70 border-4 rounded-2xl md:py-14 md:px-20 px-2 mx-20 flex justify-center items-center z-10">
            <img src={LOGO} alt="Logo" />
          </div>
        </div>
        <div className="md:bg-green-400 h-screen flex justify-center items-center">
          <div className="bg-white md:bg-opacity-100 bg-opacity-60 h-fit w-[80%] md:w-2/3 rounded-2xl shadow-lg shadow-gray-600 border-4 border-white md:border-green-500 p-5">
            <h1 className="text-4xl font-bold text-center text-gray-600 mb-10">
              Login
            </h1>
            <form
              onSubmit={handleSubmit(login)}
              className="flex w-full flex-col gap-5"
            >
              <div>
                <Input
                  label="Username:"
                  placeholder="USERNAME"
                  type="text"
                  {...register('username', {
                    required: 'Username is required',
                  })}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div>
                <Input
                  label="Password:"
                  placeholder="PASSWORD"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="w-full flex my-5 justify-center">
                <Button type="submit" className="w-[80%]">
                  Sign IN
                </Button>
              </div>
            </form>
            <div>
              <div className="flex justify-center items-center">
                <Link
                  to="/forget-password"
                  className="bg-white text-blue-500 flex justify-center items-center gap-2"
                >
                  <MdLockReset />
                  Forgot Password ?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src={Background}
          alt="background"
          className="h-screen w-screen object-cover blur-[8px]"
        />
      </div>
    </div>
  )
}

export default Login
