import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const LoginAuthentication = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token') 
    if (!token) {
      navigate('dashboard') 
    }
  }, [navigate])

  return <Outlet />
}

export default LoginAuthentication
