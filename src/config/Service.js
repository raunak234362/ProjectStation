import axios from "axios";
import { BASE_URL } from "./constant";

class Service {
    static BASE_URL = BASE_URL;

    static async getCurrentUser(token) {
        console.log('Fetching current user...', token);
        try {
            const response = await axios.get(`${BASE_URL}/user/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            console.log('Current user:', response.data);
            return response.data; 
        } catch (error) {
            console.log('Error finding Current user:', error);
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
