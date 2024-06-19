/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "../Services/axios";
import userRoutes from "../Services/endpoints/userEndpoint";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";



Api.interceptors.request.use(
    (config: any) => {
        if (config && config.url && config?.url.startsWith("/user")) {
            const userToken = localStorage.getItem("userToken")
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
            const courseId = localStorage.getItem("courseId");
            if (courseId) {
                config.headers['Course-Id'] = courseId;
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
        if (response.data.newAccessToken) {
            localStorage.setItem("userToken", response.data.newAccessToken);
        }
        const id = localStorage.getItem('userData')
        if (response.data.userId === id && response.data.blocked) {
            Cookies.remove("userToken");
            localStorage.removeItem('userInfo')
        }

        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401 && error.response?.data.message === 'User is not enrolled in this course') {
            // window.location.href = "/login";
            toast.error("you are not enrolled this course");
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



export const signup = async (name: string, email: string, phone: string, password: string, confirmPassword: string) => {
    try {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const res = await Api.post(userRoutes.userSignup, { name, email, phone, password, confirmPassword });
        return res

    } catch (error) {
        console.error('Error in signup:', error);


    }
};

export const verifyOtp = async (otp: string) => {
    try {
        const id = localStorage.getItem('userOtp')
        const res = await Api.post(userRoutes.verifyOtp, { id, otp })
        return res
    } catch (error) {
        console.log(error);
    }
};


export const forgotPassword = async (email: string) => {
    try {
        const res = await Api.post(userRoutes.forgotPassword, { email });
        const token = res.data.token
        localStorage.setItem('userotpforgotpassword', token)
        return res
    } catch (error) {
        console.log(error)
    }
}



export const verifyOtpForgotPassword = async (otp: string, email: string) => {
    try {
        const token = localStorage.getItem('userotpforgotpassword')
        const res = await Api.post(userRoutes.verifyForgot, { otp, email }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        localStorage.removeItem('userotpforgotpassword')
        return res
    } catch (error) {
        console.log(error)
    }
}
export const ChangedPasswordForgot = async (email: any, newpassword: any, confirmpassword: any) => {
    try {
        const res = await Api.post(userRoutes.changedPassword, { email, newpassword, confirmpassword });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const otpResend = async (email: string) => {
    try {
        console.log(email)
        const res = await Api.post(userRoutes.resendOtp, { email });
        return res
    } catch (error) {
        console.log(error)
    }
};

export const userLogin = async (email: string, password: string) => {
    try {
        const res = await Api.post(userRoutes.userLogin, { email, password })
        localStorage.setItem("userToken", res?.data.token)

        return res
    } catch (error) {
        console.log(error)
    }
};
export const googleLogin = async (email: string, password: string) => {
    try {
        const res = await Api.post(userRoutes.userLogin, { email, password })
        return res
    } catch (error) {
        console.log(error)
    }
};


export const profile = async (userId: string) => {
    try {

        const res = await Api.get(`${userRoutes.profilepage}/${userId}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const profileEdit = async (userId: string, userData: any) => {
    try {

        const res = await Api.put(`${userRoutes.updateProfile}/${userId}`, userData);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const profileImages = async (payload: any) => {
    try {

        const res = await Api.post(userRoutes.uploadProfilePic, payload);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const updateProfilePassword = async (userId: string, oldpassword: string, newpassword: string, confirmpassword: string) => {
    try {

        const res = await Api.put(`${userRoutes.updateprofilePassword}/${userId}`, { oldpassword, newpassword, confirmpassword });
        return res
    } catch (error) {
        console.log(error)
    }
}
export const changeEmail = async (id: string, email: string) => {
    try {
        const res = await Api.put(`${userRoutes.emailchange}/${id}`, { email });

        return res
    } catch (error) {
        console.log(error)
    }
}

export const Emailverification = async (otp: string, email: string) => {
    try {
        const res = await Api.post(userRoutes.verifyEmail, { otp, email });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const courseView = async () => {
    try {
        const res = await Api.post(userRoutes.Course);

        return res
    } catch (error) {
        console.log(error)
    }

}

export const CourseDetailsPageGetCourse = async (id: string | undefined) => {
    try {
        const res = await Api.get(`${userRoutes.GetCourse}/${id}`);
        console.log("responsevalue", res)
        localStorage.setItem("courseId", res.data.id);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const CourseDetailsPageGetUsers = async (id: string | null) => {
    try {
        const res = await Api.get(`${userRoutes.GetUsers}/${id}`);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetVideoCall = async () => {
    try {
        const res = await Api.get(userRoutes.GetVideoCall);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetPayment = async () => {
    try {
        const res = await Api.get(userRoutes.GetPayment);

        return res
    } catch (error) {
        console.log(error)
    }
}

export const Payment = async (amount: number) => {
    try {
        const res = await Api.post(userRoutes.Payment, { amount });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const OrderPost = async (id: string | null, courseId: string, payment_Info: any) => {
    try {
        const res = await Api.post(userRoutes.OrderPost, { id, courseId, payment_Info });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetCourse = async (id: string | undefined) => {
    try {
        const res = await Api.get(`${userRoutes.GetCourseAcess}/${id}`);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetCourses = async () => {
    try {

        const res = await Api.get(userRoutes.GetCourses);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetCategory = async () => {
    try {
        const res = await Api.get(userRoutes.GetCategory);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetChapters = async (id: string | undefined) => {
    try {
        const res = await Api.get(`${userRoutes.getChapters}/${id}`);

        return res
    } catch (error) {
        console.log(error)
    }
}

export const GetSearchCourse = async (searchTerm?: any, category?: string, price?: number) => {
    try {
        const res = await Api.get(`${userRoutes.searchCourse}`, {
            params: {
                searchTerm,
                category,
                price
            }
        });

        return res;
    } catch (error) {
        console.error(error);
    }
};
export const EnrolledCoursesView = async (id: string | null) => {
    try {
        const res = await Api.get(`${userRoutes.EnrolledCourses}/${id}`);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const generateCertificate = async (courseId: string, studentId: string | null, responseType: any) => {
    try {
        const res = await Api.get(`${userRoutes.download}/${courseId}/${studentId}`, { responseType: responseType });

        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "certificate.pdf");


        document.body.appendChild(link);
        link.click();

        console.log(res, "ress");
    } catch (error) {
        console.error("Error downloading the certificate", error);
    }
}


export const ReviewSubmit = async (reviews: any, rating: any, id: any, userId: any) => {
    try {
        const res = await Api.post(userRoutes.ReviewSubmit, { reviews, rating, id, userId });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const EditReviewSubmit = async (reviews: any, rating: any, id: any, userId: any) => {
    try {
        const res = await Api.post(userRoutes.EditReviewSubmit, { reviews, rating, id, userId });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetChapterView = async (id: string | undefined, userId: any) => {
    try {
        const res = await Api.get(`${userRoutes.CompletedChapterView}/${id}/${userId}`);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const ChaptersCompletedTime = async (id: string | undefined, userId: any) => {
    try {
        const res = await Api.post(userRoutes.ChapterCompletedTimeUpadate, { id, userId });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetLessonsView = async (id: string | undefined, userId: any) => {
    try {
        const res = await Api.get(`${userRoutes.CompletedLessonsView}/${id}/${userId}`);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const PostompletedChapter = async (chapterId: any, id: any, userId: any) => {
    try {
        const res = await Api.post(userRoutes.CompletedChaptersPost, { chapterId, id, userId });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const PostompletedLesson = async (lessonId: any, id: any, userId: any) => {
    try {
        const res = await Api.post(userRoutes.CompletedLessonPost, { lessonId, id, userId });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const fetchEnrolled = async (id: string | undefined, usersId: any) => {
    try {
        const res = await Api.get(`${userRoutes.fetchENrolled}/${id}/${usersId}`);

        return res
    } catch (error) {
        console.log(error)
    }
}
export const QuestionAnswer = async (questionId: any, answer: any, id: any, usersId: any) => {
    try {
        const res = await Api.post(userRoutes.QuestionAnswer, { questionId, answer, id, usersId });

        return res
    } catch (error) {
        console.log(error)
    }
}

export const getTutorbyId = async (userId: string | undefined) => {
    try {
        const res = await Api.get(`${userRoutes.findTutors}/${userId}`);

        return res
    } catch (error) {
        console.log(error)
    }
}


export const ChatWithTutor = async (userId: any) => {
    try {
        // const res = await Api.get(userRoutes.TutorsChat);
        const res = await Api.get(`${userRoutes.TutorsChat}/${userId}`);


        return res
    } catch (error) {
        console.log(error)
    }
}
export const NewConversationWithTutor = async (senderId: any, receiverId: any) => {
    try {
        const res = await Api.post(userRoutes.newConverSationWithTutor, { senderId, receiverId });

        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetMessagesForUser = async (id: any) => {
    try {

        const res = await Api.get(`${userRoutes.GetMessagesUser}/${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const MessagePostUser = async (message: any) => {
    try {

        const res = await Api.post(userRoutes.NewMessageForUser, message)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const getConversationtrainer = async (currentUser: any, tutorid: any) => {
    try {

        const res = await Api.get(`${userRoutes.getConversationTutor}/${currentUser}/${tutorid}`);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const FilePostTutor = async (message: any) => {
    try {
        const res = await Api.post(userRoutes.NewMessageForUser, message)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const UserLogout = async () => {
    try {

        const res = await Api.post(userRoutes.userLogout)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const GoogleAuth = async (name: any, email: any, googlePhotoUrl: any, headers: any) => {
    try {

        const res = await Api.post(userRoutes.googleAuth, { name, email, googlePhotoUrl }, { headers })
        return res
    } catch (error) {
        console.log(error)
    }
}

