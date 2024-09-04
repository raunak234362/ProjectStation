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
      
     
      return response.data;
    } catch (error) {
      console.error('Error in login:', error)
      throw error
    }
  }
}
export default AuthService
