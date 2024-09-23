import axios from 'axios';
import { BASE_URL } from './constant';

class Service {
  // BASE_URL is stored as a constant
  static BASE_URL = BASE_URL;

  // Fetch the logged-in user
  static async getCurrentUser(token) {
    try {
      const response = await axios.get(`${BASE_URL}/user/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error finding Current user:', error);
      throw error;
    }
  }



  // Add a new employee (staff)
  static async addEmployee(updatedData, token) {
    try {
      const data = new FormData();
      Object.keys(updatedData).forEach(key => data.append(key, updatedData[key]));
      const response = await axios.post(`${BASE_URL}/user/staff/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error adding staff:', error.response?.data || error);
      throw error;
    }
  }

  // Change password
  static async changePassword(token, data) {
    try {
      const response = await axios.put(`${BASE_URL}/change-password/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log('Error changing password:', error);
      return error
    }
  }

  // Fetch all employees (staff)
  static async allEmployee(token) {
    try {
      const response = await axios.get(`${BASE_URL}/user/staff`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching employees:', error);
      throw error;
    }
  }

  // Fetch all departments
  static async allDepartment(token) {
    try {
      const response = await axios.get(`${BASE_URL}/department`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching departments:', error);
      throw error;
    }
  }

  // Add new department
  static async addDepartment(token, data) {
    try {
      const departmentData = new FormData();
      Object.keys(data).forEach(key => departmentData.append(key, data[key]));
      const response = await axios.post(`${BASE_URL}/department/`, departmentData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error adding department:', error);
      throw error;
    }
  }

  // Add new fabricator
  static async addFabricator(token, data) {
    try {
      const fabData = new FormData();
      Object.keys(data).forEach(key => fabData.append(key, data[key]));
      const response = await axios.post(`${BASE_URL}/fabricator/`, fabData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log('Error adding fabricator:', error);
      return error;
    }
  }

  // Fetch all fabricators
  static async allFabricator(token) {
    try {
      const response = await axios.get(`${BASE_URL}/fabricator`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching fabricators:', error);
      throw error;
    }
  }

  // Add Client user
  static async addClient(data) {
    try {
      const clientData = new FormData();
      
      Object.keys(data).forEach(key => {
        if (data[key])
          clientData.append(key, data[key]);
      });
      clientData.append('role', 'CLIENT');
      console.log(data)
      const response = await axios.post(`${BASE_URL}/fabricator/${data['fabricator']}/clients/`, clientData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      return response;
    } catch (error) {
      console.log('Error adding client:', error);
      throw error;
    }
  }

  // Fetch all clients
  static async allClient(token) {
    try {
      const response = await axios.get(`${BASE_URL}/user/client`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching clients:', error);
      throw error;
    }
  }

  // Add new vendor
  static async addVendor(data) {
    try {
      const vendorData = new FormData();
      
      Object.keys(data).forEach(key => {
        if (data[key])
          vendorData.append(key, data[key]);
      });
      vendorData.append('role', 'VENDOR');
      console.log(data)
      const response = await axios.post(`${BASE_URL}/vendor/`, vendorData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      return response;
    } catch (error) {
      console.log('Error adding vendor:', error);
      throw error;
    }
  }
  // Add new vendor user
  static async addVendorUser(data) {
    try {
      const vendorUserData = new FormData();
      
      Object.keys(data).forEach(key => {
        if (data[key])
          vendorUserData.append(key, data[key]);
      });
      vendorUserData.append('role', 'VENDOR');
      console.log(data)
      const response = await axios.post(`${BASE_URL}/vendor/${data['vendor']}/users/`, vendorUserData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      return response;
    } catch (error) {
      console.log('Error adding vendor:', error);
      throw error;
    }
  }

  // Fetch all vendor users
  static async allVendorUser(token) {
    try {
      const response = await axios.get(`${BASE_URL}/user/vendor/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching vendors:', error);
      throw error;
    }
  }
  // Fetch all Vendors
  static async allVendor(token) {
    try {
      const response = await axios.get(`${BASE_URL}/vendor/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching vendors:', error);
      throw error;
    }
  }

  // Fetch all projects
  static async allprojects(token){
    try {
      const response = await axios.get(`${BASE_URL}/project/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching projects:', error);
      throw error;
    }
  }

  // Ping server
  static async ping() {
    try {
      const response = await Promise.race([
        axios.get(`${BASE_URL}/ping`, {
          headers: {
            'Content-Type': 'application/json',
          }}),
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 10000);
        }),
      ]);
      return response.data.connection;
    } catch (error) {
      console.log('Error pinging server:', error);
      return false;
    }
  }
}

export default Service;
