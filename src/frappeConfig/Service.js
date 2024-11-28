import axios from "axios";
import { BASE_URL2 } from "../config/constant";

class Service {
    static BASE_URL = BASE_URL2;

    //fetch the logged-in user
    static async getCurrentUser(token) {
        try {
          const response = await axios.get(`${BASE_URL2}/resource/User/`, {
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

}
export default Service;
