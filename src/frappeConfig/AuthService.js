/* eslint-disable no-unused-vars */
import axios from 'axios'
import { BASE_URL2 } from '../config/constant'

class AuthService {
  static BASE_URL = BASE_URL2;

  // Login Method
  static async login({ username, password }) {
    try {
      const formData = new URLSearchParams();
      formData.append('usr', username.toLowerCase()); // Frappe uses `usr` as the field for username
      formData.append('pwd', password); // Frappe uses `pwd` for password

      const response = await axios.post(`${this.BASE_URL}/method/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        return response.data; // Frappe returns session info on successful login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid username or password');
      } else {
        console.error('Error in login:', error);
        throw new Error('Could not connect to server');
      }
    }
  }

  // Logout Method
  static async logout() {
    try {
      const response = await axios.post(`${this.BASE_URL}/api/method/logout`);
      if (response.status === 200) {
        console.log('Logout successful:', response.data);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userType');
        return response.data;
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Could not connect to server');
    }
  }
}

export default AuthService;
