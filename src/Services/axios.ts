import axios,{AxiosInstance} from "axios";



const Api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});



export default Api;