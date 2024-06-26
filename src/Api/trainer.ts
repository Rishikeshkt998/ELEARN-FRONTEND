/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "../Services/axios";
import trainerRoutes from "../Services/endpoints/trainerEndpoint";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

Api.interceptors.request.use(
    (config: any) => {
        if (config && config.url && config?.url.startsWith("/trainer")) {
            const trainerToken = localStorage.getItem("trainerToken")


            if (trainerToken) {
                config.headers.Authorization = `Bearer ${trainerToken}`;
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
        if (error.response && error.response.status === 401 &&error.response.data.message=== "Unauthorized - Invalid token from tutor") {
            toast.error("trainer is not authenticated login to continue");
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
export const trainerSignup = async (name: string, email: string, phone: string, password: string, confirmpassword: string,dateOfBirth:string) => {
    try {
        if (password !== confirmpassword) {
            throw new Error('Passwords do not match');
        }

        const res = await Api.post(trainerRoutes.trainerSignup, { name, email, phone, password, confirmpassword,dateOfBirth });
        console.log(res)
        return res
    } catch (error) {
        console.error('Error in signup:', error);

        toast.error('An error occurred during signup. Please try again later.');
        throw error;
    }
};


export const trainerLogin = async (email: string, password: string) => {
    try {
        const res = await Api.post(trainerRoutes.trainerLogin, { email, password })
        localStorage.setItem("trainerToken", res?.data.token)
        return res
    } catch (error) {
        console.log(error)
    }
};
export const verifyTutorOtp = async (otp: string) => {
    try {
        const id = localStorage.getItem('trainerOtp')
        const res = await Api.post(trainerRoutes.verifyTutorOtp, { id, otp })
        return res
    } catch (error) {
        console.log(error);
    }
};
export const TutorotpResend = async (email: string) => {
    try {
        console.log(email)
        const res = await Api.post(trainerRoutes.trainerresendOtp, { email });
        return res
    } catch (error) {
        console.log(error)
    }
};
export const sheduleClasses = async (id:any, meetingDate:any, meetingTime:any, meetingCode:any, description:any) => {
    try {
        const res = await Api.post(trainerRoutes.sheduleClass, { id, meetingDate, meetingTime, meetingCode, description });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const forgotTutorPassword = async (email: string) => {
    try {
        const res = await Api.post(trainerRoutes.forgotTutorPassword, { email });
        return res
    } catch (error) {
        console.log(error)
    }
}
export const ChangePasswordTutors = async (email:any, newpassword:any, confirmpassword:any) => {
    try {
        const res = await Api.post(trainerRoutes.changedTutorPassword, { email, newpassword, confirmpassword });
        return res
    } catch (error) {
        console.log(error)
    }
}



export const verifyOtpForgotPasswordTutor = async (otp: string, email: string) => {
    try {

        const res = await Api.post(trainerRoutes.verifyTutorForgot, { otp, email });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const tutorprofile = async (trainerId: string) => {
    try {

        const res = await Api.get(`${trainerRoutes.trainerprofile}/${trainerId}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const tutorprofileImages = async (payload:any) => {
    try {

        const res = await Api.post(trainerRoutes.traineruploadprofilepic,payload);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const updatetutorProfilePassword = async (trainerId: string, oldpassword: string, newpassword: string, confirmpassword: string) => {
    try {

        const res = await Api.put(`${trainerRoutes.trainerupdatepassword}/${trainerId}}`, { oldpassword, newpassword, confirmpassword });
        return res
    } catch (error) {
        console.log(error)
    }
}
export const updateTrainerProfilePassword = async (trainerId: string, oldpassword: string, newpassword: string, confirmpassword: string) => {
    try {

        const res = await Api.put(`${trainerRoutes.trainerupdatepassword}/${trainerId}`, { oldpassword, newpassword, confirmpassword });
        return res
    } catch (error) {
        console.log(error)
    }
}
export const TrainerProfileEdit = async (trainerId:any, trainerData:any) => {
    try {

        const res = await Api.put(`${trainerRoutes.trainerupdateprofile}/${trainerId}`,trainerData);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const TrainerProfileEditGet = async (id:any) => {
    try {

        const res = await Api.get(`${trainerRoutes.trainerprofileedit}/${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const getCategory = async () => {
    try {
        const res = await Api.get(trainerRoutes.getcategory);
        return res;
    } catch (err) {
        console.log(err);
    }
}




export const TrainerCourseAdd = async (data: any, headers:any) => {
    try {
        
        const res = await Api.post(trainerRoutes.AddCourse,  data , { headers })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetCourse = async (courseId: string|undefined) => {
    try {

        const res = await Api.get(`${trainerRoutes.GetCourse}/${courseId}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetCourses = async (id:string|null) => {
    try {

        const res = await Api.get(`${trainerRoutes.GetTutorCourses}/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetChapters = async (courseId: string | undefined) => {
    try {

        const res = await Api.get(`${trainerRoutes.GetChapters}/${courseId}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const TrainerCourseEdit = async (data: any, courseId: any, headers: any) => {
    try {

        const res = await Api.post(`${trainerRoutes.EditCourse}/${courseId}`, data, { headers })
        return res
    } catch (error) {
        console.log(error)
    }
}


export const fetchReviews = async (id:string|undefined) => {
    try {

        const res = await Api.get(`${trainerRoutes.fetchReview}/${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const CommentReply = async (reviewId: any,replyText:any) => {
    try {

        const res = await Api.post(trainerRoutes.CommentReply, { reviewId,replyText })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const AddQuestions = async (values:any) => {
    try {

        const res = await Api.post(trainerRoutes.AddQuestions,  values )
        return res
    } catch (error) {
        console.log(error)
    }
}

export const GetQuestions = async (id: string | undefined) => {
    try {

        const res = await Api.get(`${trainerRoutes.GetQuestions}/${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const DeleteQuestions = async (questionId: string | undefined,courseId:string|undefined) => {
    try {

        const res = await Api.delete(`${trainerRoutes.DeleteQuestions}?courseId=${courseId}&questionId=${questionId}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const fetchEnrolledStudents = async () => {
    try {

        const res = await Api.get(trainerRoutes.EnrolledStudents);
        return res
    } catch (error) {
        console.log(error)
    }
}



export const fetchUsersForChat = async (userId:any) => {
    try {

        // const res = await Api.get(trainerRoutes.TrainerChat);
        const res = await Api.get(`${trainerRoutes.TrainerChat}/${userId}`);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const NewMessageForTutor = async (senderId: any, receiverId:any) => {
    try {

        const res = await Api.post(trainerRoutes.NewMessage,{senderId,receiverId})
        return res
    } catch (error) {
        console.log(error)
    }
}

export const GetMessagesForTutor = async (id:any) => {
    try {

        const res = await Api.get(`${trainerRoutes.GetMessages}/${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const MessagePost = async (message:any) => {
    try {

        const res = await Api.post(trainerRoutes.MessagePost,  message )
        return res
    } catch (error) {
        console.log(error)
    }
}
export const MessageRead = async (id: any) => {
    try {
        console.log("idvalue",id)
        const res = await Api.put(`${trainerRoutes.messageread}/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const FilePost = async (message: any) => {
    try {

        const res = await Api.post(trainerRoutes.MessagePost, message)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const GetConversations = async (currentUser: any, tutorid:any) => {
    try {

        const res = await Api.get(`${trainerRoutes.GetConversation}/${currentUser}/${tutorid}`);
        return res
    } catch (error) {
        console.log(error)
    }
}


export const SheduledView = async () => {
    try {

        const res = await Api.get(trainerRoutes.SheduledView);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const CourseAnalysisForTutor = async (id:string|null) => {
    try {
        const res = await Api.get(`${trainerRoutes.courseDataAnalysisTutor}/${id}`);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const UserAnalysisForTutor = async (id:string|null) => {
    try {
        const res = await Api.get(`${trainerRoutes.userDataAnalysisTutor}/${id}`);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const OrderAnalysisForTutor = async (id: string|null) => {
    try {
        const res = await Api.get(`${trainerRoutes.orderDataAnalysisTutor}/${id}`);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const DeleteCourse = async (id: any) => {
    try {

        const res = await Api.post(`${trainerRoutes.DeleteCourse}/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const PublishCourse= async (id: any) => {
    try {

        const res = await Api.post(`${trainerRoutes.PublishCourse}/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const TotalCountTutor = async (id:any) => {
    try {
        const res = await Api.get(`${trainerRoutes.TotalCountTutor}/${id}`);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const TrainerLoggedOut = async () => {
    try {
        const res = await Api.post(trainerRoutes.trainerLogout);
        console.log(res)
        return res;
    } catch (err) {
        console.log(err)
    }
}




