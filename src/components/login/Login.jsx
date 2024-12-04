/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import LOGO from "../../assets/logo.png";
import Background from "../../assets/background-image.jpg";
import { Input, Button } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { MdLockReset } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updatetoken as authLogin, setUserData } from "../../store/userSlice";
import AuthService from '../../config/AuthService'
// import AuthService from "../../frappeConfig/AuthService";
import Service from "../../config/Service";
import { useEffect } from "react";
import { logout as logoutAction } from "../../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      const user = await AuthService.login(data);
      // console.log("User :",user)
      if ('token' in user) {
        const token = user.token
        sessionStorage.setItem('Token',token )
        const userData = await Service.getCurrentUser(token)
        console.log("UserData :",userData)
        let userType = 'user'
        if (userData[0].role === 'STAFF') {
          if (userData[0].is_superuser) {
            userType = 'admin';
          } else if (userData[0].is_sales) {
            userType = 'sales';
          } else if (userData[0].is_staff && userData[0].is_manager) {
            userType = 'department-manager';
          } else if (userData[0].is_manager) {
            userType = 'project-manager';
          }
        } else if (userData[0].role === 'CLIENT') {
          userType = 'client';
        } else if (userData[0].role === 'VENDOR') {
          userType = 'vendor';
        }

        sessionStorage.setItem('userType', userType)
        dispatch(authLogin(user))
        dispatch(setUserData(userData[0]))
        console.log(userData[0].is_firstLogin)
        if (userData[0]?.is_firstLogin) navigate('/change-password/')
        else if(userType === 'admin') navigate('/admin/dashboard')
        else if(userType === 'client') navigate('/client')
        else if(userType === 'sales') navigate('/sales')
        else if(userType === 'staff') navigate('/staff')
        // else if(userType === 'department-manager') navigate('/department-manager')
        else if(userType === 'project-manager') navigate('/project-manager')
        // else if(userType === 'project-manager-officer') navigate('/project-manager')
        else if(userType === 'vendor') navigate('/vendor')
        else navigate('/')
      } else {
        alert('Invalid Credentials')
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Invalid Credentials") {
        alert("Invalid Credentials");
      } else {
        alert("Could not connect to server");
      }
    }
  };

  // const fetchLogout = async () => {
  //   try {
  //     const response = await AuthService.logout(token);
  //     dispatch(logoutAction());
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  // const fetchUser = async () => {
  //   try {
  //     const User = await Service.getCurrentUser(token);
  //     dispatch(setUserData(User));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUser();
  // }, []);

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
                  {...register("username", {
                    required: "Username is required",
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
                  {...register("password", {
                    required: "Password is required",
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
              {/* <Button className="bg-teal-400 mx-4 w-full" onClick={fetchLogout}>
                Logout
              </Button> */}
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
  );
};

export default Login;
