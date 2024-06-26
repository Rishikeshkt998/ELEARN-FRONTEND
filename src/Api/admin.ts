/* eslint-disable @typescript-eslint/no-explicit-any */

// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import Api from "../Services/axios";
import adminRoutes from "../Services/endpoints/adminEndpoint";

Api.interceptors.request.use(
    (config: any) => {
        if (config && config.url && config?.url.startsWith("/admin")) {
            const adminToken = localStorage.getItem("adminToken");


            if (adminToken) {
                config.headers.Authorization = `Bearer ${adminToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


Api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401 && error.response.data.message === "Unauthorized - Invalid token from admin" ) {
            toast.error("admin is not authenticated");
            window.history.back();
            return Promise.reject(error);

        } else if (error.response && error.response.status === 404) {
            window.location.href = "/error404";
            return Promise.reject(error);

        } else if (error.response && error.response.status === 500) {
            window.location.href = "/error500";
        }
        return Promise.reject(error);
    }
);


export const adminLogin = async (email: string, password: string) => {
    try {
        console.log('In admin api')
        const res = await Api.post(adminRoutes.adminLogin, { email, password });
        localStorage.setItem("adminToken", res?.data.token)
        console.log(res)
        return res;
    } catch (err) {
        console.log(err);

    }
}

export const getUsers = async () => {
    try {
        const res = await Api.get(adminRoutes.getUsers);
        return res;
    } catch (err) {
        console.log(err);
    }
}



export const blockUser = async (id: string) => {
    try {
        const res = await Api.put(`${adminRoutes.blockUser}/${id}`);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err);
    }
}
export const userUnblock = async (id: string) => {
    try {
        const res = await Api.put(`${adminRoutes.unBlockuser}/${id}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}
export const getTrainers = async () => {
    try {
        const res = await Api.get(adminRoutes.getTrainers);
        return res;
    } catch (err) {
        console.log(err);
    }
}
export const verifytrainer = async (id: string) => {
    try {
        const res = await Api.put(`${adminRoutes.trainerVerify}/${id}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const unverifyTrainer = async (id: string) => {
    try {
        const res = await Api.put(`${adminRoutes.trainerunVerify}/${id}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}
export const verifyCourse = async (id: string|undefined) => {
    try {
        const res = await Api.put(`${adminRoutes.CourseVerify}/${id}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const unverifyCourse = async (id: string|undefined) => {
    try {
        const res = await Api.put(`${adminRoutes.CourseunVerify}/${id}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}


export const viewCategory = async () => {
    try {
        const res = await Api.get(adminRoutes.categoryView);
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const CourseShow = async () => {
    try {
        const res = await Api.get(adminRoutes.courseShow);
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const addCategory = async (name: string, description: string) => {
    try {
        const res = await Api.post(adminRoutes.addCategory, { name, description });
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const editCategory = async (id: string) => {
    try {
        const res = await Api.get(`${adminRoutes.editCategory}/${id}`);
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const updateCategory = async (id: string, name: string, description: string) => {
    try {
        const res = await Api.put(`${adminRoutes.updateCategory}/${id}`, { name, description });
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const res = await Api.get(`${adminRoutes.deleteCategory}/${id}`);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const adminLogoutRoute = async () => {
    try {
        const res = await Api.post(adminRoutes.adminlogout);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const CourseAnalysis = async () => {
    try {
        const res = await Api.get(adminRoutes.courseAnalysis);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const UserAnalysis = async () => {
    try {
        const res = await Api.get(adminRoutes.UserAnalysis);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const OrderAnalysis = async () => {
    try {
        const res = await Api.get(adminRoutes.OrderAnalysis);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const TotalCount= async () => {
    try {
        const res = await Api.get(adminRoutes.totalcount);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}

