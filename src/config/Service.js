import axios from "axios";
import { BASE_URL } from "./constant";

class Service {
    static BASE_URL = BASE_URL;

    static async getCurrentUser(token) {
        try {
            const response = await axios.get(`${BASE_URL}/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data; 
        } catch (error) {
            console.log('Error finding Current user:', error);
        }
    }

    static async ping() {
        try {
            const response = await axios.get(`${BASE_URL}/ping`, { 
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data.connection;
        } catch (error) {
            console.log('Error pinging server:', error); 
            return false;
        }
    }
}

export default Service;
