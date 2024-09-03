import { BASE_URL } from "./constant";

class Service {
    static BASE_URL =BASE_URL

    static async getCurrentUser(token) {
        sessionStorage.getItem(token)
        try {
            const response = await fetch(`${BASE_URL}/user`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })
            const data = await response.json()
            return data;
        } catch (error) {
            console.log('Error finding Current user:',error)
        }
    }

    static async ping() {
        try {
            const response = await fetch(`${BASE_URL}/ping`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            const data = await response.json()
            return data.connection;
        } catch (error) {
            console.log('Error finding Current user:',error);
            return false;
        }
    }
}
export default Service;