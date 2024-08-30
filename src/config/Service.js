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
}
export default Service;