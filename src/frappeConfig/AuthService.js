/* eslint-disable no-unused-vars */
import axios from 'axios';
import { BASE_URL2 } from '../config/constant';

class AuthService {
  static BASE_URL = BASE_URL2;

  // Login Method
  static async login({ username, password }) {
    console.log('Login:', username, password);
    try {
      const formData = new URLSearchParams();
      formData.append('usr', username.toLowerCase());
      formData.append('pwd', password);
      const response = await axios.post(`${this.BASE_URL}/method/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('Response:', response);

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        // Assuming Frappe returns session token in the response on success
        const { session_token, user_type } = response.data;
        // Store the session token and user type in sessionStorage for subsequent requests
        sessionStorage.setItem('token', session_token);
        sessionStorage.setItem('userType', user_type);
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
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found for logout');
    }
    try {
      const response = await axios.post(
        `${this.BASE_URL}/method/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as an Authorization header
          },
        }
      );
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
