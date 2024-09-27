/* eslint-disable no-unused-vars */
import axios from 'axios'
import { BASE_URL } from './constant'

class AuthService {
  static BASE_URL = BASE_URL

  static async login({ username, password }) {
    try {
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)
       
      const response = await axios.post(`${BASE_URL}/user/login/`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }) 
      if (response.status === 400) {
        throw new Error('Invalid Credentials')  
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error('Invalid Credentials')
      } else {
        console.error('Error in login:', error)
        throw new Error('Could not connect to server')
      }
    }
  }

  // Fetch logout
static async logout(token) {
  try {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userType');
    console.log('User successfully logged out');
  } catch (error) {
    console.log('Error during logout:', error);
    throw error;
  }
}


}
export default AuthService
