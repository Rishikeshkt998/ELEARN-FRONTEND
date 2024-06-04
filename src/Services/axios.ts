import axios,{AxiosInstance} from "axios";
// import { toast } from "react-toastify";
// import { toast } from "react-toastify";


const Api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
});
// Api.interceptors.response.use(
//     (response) => {
//         console.log("response value",response)
//         return response;
//     },
//     (error) => {
//         console.log("error",error)
//         const { response } = error;
//         console.log("response",response)
//         if (response) {
//             if (response.status === 401 && response.data?.message === 'User is blocked !!') {
//                 window.location.href = "/login";
//                 toast.error("Your profile is blocked. Please contact support.");
//             } else if (response.status === 404) {

//                 window.location.href = "/error404";
//             } else if (response.status === 500) {
//                 window.location.href = "/error500";
//             }
//         } else {
//             toast.error("Network error. Please check your internet connection.");
//         }
//         return Promise.reject(error);
//     }
// );


export default Api;