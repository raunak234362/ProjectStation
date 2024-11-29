import axios from 'axios';
import { BASE_URL2 } from '../config/constant';

class FrappeService {
  static BASE_URL = BASE_URL2;

  // Fetch the logged-in user from Frappe
  static async getCurrentUser() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, user not logged in');
    }

    try {
      // Send a GET request to the Frappe method that returns the logged-in user
      const response = await axios.get(`${this.BASE_URL}/api/method/frappe.auth.get_logged_in_user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use the token for authentication (Bearer Token)
        },
      });
      
      console.log('Current user:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error fetching current user from Frappe:', error);
      throw new Error('Could not fetch user data');
    }
  }
}

export default FrappeService;
