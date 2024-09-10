import axios from 'axios'
import { BASE_URL } from './constant'

class Service {
  //constant BASE_URL
  static BASE_URL = BASE_URL

  //Fetch Loginned User
  static async getCurrentUser(token) {
    try {
      const response = await axios.get(`${BASE_URL}/user/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log('Error finding Current user:', error)
    }
  }

  //Add New Staff(Employee)
  static async addEmployee(token) {
    try {
      const response = await axios.post(`${BASE_URL}/user/staff`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log('Error Adding Staff', error)
    }
  }
  //Show All Staff(Employee)
  static async allEmployee(token){
    try {
      const response = await axios.get(`${BASE_URL}/user/staff`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log('Error finding Staff', error)
    }
  }

  static async ping() {
    try {
      const response = await Promise.race([
        axios.get(`${BASE_URL}/ping`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 10000)
        }),
      ])
      return response.data.connection
    } catch (error) {
      console.log('Error pinging server:', error)
      return false
    }
  }
}

export default Service
