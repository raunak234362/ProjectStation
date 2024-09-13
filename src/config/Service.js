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
  static async addEmployee(updatedData, token) {
    try {
      const data = new FormData();
      for (const key in updatedData) {
        data.append(key, updatedData[key]);
      }
      const response = await axios.post(`${BASE_URL}/user/staff/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Error Adding Staff', error);
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

  //Show All Department
  static async allDepartment(token){
    try {
      const response = await axios.get(`${BASE_URL}/department`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log('Error finding Department', error)
    }
  }

  //Show All Fabricator
  static async allFabricator(token){
    try {
      const response = await axios.get(`${BASE_URL}/fabricator`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log('Error finding Fabricator', error)
    }
  }


  //Show All Clients
  static async allClient(token){
    try {
      const response = await axios.get(`${BASE_URL}/user/client`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log('Error finding Client', error)
    }
  }

  //Show All Vendors
  static async allVendor(token){
    try {
      const response = await axios.get(`${BASE_URL}/user/vendor`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log('Error finding Vendor', error)
    }
  }

  //Ping
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
