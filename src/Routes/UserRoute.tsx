import { Route, Routes } from "react-router-dom"
import UserLoggedOut from "../Components/user/userLoggedOut"
import UserHome from "../Pages/User/Home/UserHome"

import UserLoggedIn from "../Components/user/UserLoggedIn"
import LoginContainer from "../Pages/User/LoginUser/LoginContainer"
import Signupcontainer from "../Pages/User/SignUp/Signupcontainer"
import Otpcontainer from "../Pages/User/Otp/Otpcontainer"


import TrainerContainer from "../Pages/User/TrainerRegistration/TrainerContainer"

import Forgototppasswordcontainer from "../Pages/User/Forgot/Forgototppasswordcontainer"
import Forgototpcontainer from "../Pages/User/Forgot/Forgototpcontainer"
import Changepasswordcontainer from "../Pages/User/Forgot/Changepasswordcontainer"
import Profilecontainer from "../Pages/User/Profile/Profilecontainer"
import ProfileEditpage from "../Pages/User/Profile/ProfileEditpage"
import Changepassword from "../Pages/User/Profile/Changepassword"
import Profilepicture from "../Pages/User/Profile/Profilepicture"
import ProfileChangeEmail from "../Pages/User/Profile/ProfileChangeEmail"
import Profilepage from "../Pages/User/Profile/Profilepage"
import ProfileOtpcontainer from "../Pages/User/Profile/ProfileOtpcontainer"
import DetailsPage from "../Pages/User/coursedetailspage/DetailsPage"
import PaymentSuccessPage from "@/Pages/User/coursedetailspage/PaymentSuccessPage"
import VideoCallDashboard from "@/Pages/User/videocall/VideoCallashboard"
import CourseAccessContainer from "@/Pages/User/CourseAccess/CourseAccessContainer"
import TrainerOtpContainer from "@/Pages/User/TrainerOtp/TrainerOtpContainer"
import Chatpage from "@/Pages/User/chat/Chatpage"
import EnrolledCourses from "@/Components/user/EnrolledCourses"
import UserCoursepageContainer from "@/Pages/User/UserCoursePage/UserCoursepageContainer"
import UserLanding from "@/Components/common/UserCommon/UserLanding"
import Error404 from "@/Components/common/ErrorPage/Error404"
import Error500 from "@/Components/common/ErrorPage/Error500"


const UserRoute = () => {
    return (
        <Routes>

            <Route path='' element={<UserLoggedOut />}>
                <Route path="" element={<UserLanding />} />
                <Route path="login" element={<LoginContainer />} />
                <Route path="signup" element={<Signupcontainer />} />
                <Route path="otp" element={<Otpcontainer />} />
                <Route path='forgotPassword' element={<Forgototppasswordcontainer />} />
                <Route path='forgotPasswordOtp' element={<Forgototpcontainer />} />
                <Route path='changepassword' element={<Changepasswordcontainer />} />
                
                
            </Route>
            <Route path="" element={<UserLoggedIn />}>
                <Route path="/error404" element={<Error404 />} />
                <Route path="/error500" element={<Error500 />} />
                <Route path="home" element={<UserHome />} />
                <Route path="course" element={<UserCoursepageContainer />} />
                <Route path='chat' element={<Chatpage />} />
                <Route path='videocall/:roomID' element={<VideoCallDashboard />} />
                <Route path='trainerregistration' element={<TrainerContainer />} />
                <Route path='trainerotp' element={<TrainerOtpContainer />} />
                <Route path="profleotp" element={<ProfileOtpcontainer />} />
                <Route path="coursedetails/:id" element={<DetailsPage />} />
                <Route path="coursecontentpage/:id" element={<CourseAccessContainer />} />
                <Route path="paymentsucess" element={<PaymentSuccessPage />} />
                <Route path="profile" element={<Profilecontainer />}>
                    <Route path="" element={<Profilepage />} />
                    <Route path='profileedit' element={<ProfileEditpage />} />
                    <Route path="changepassword" element={<Changepassword />} />
                    <Route path="profilepicture" element={<Profilepicture />} />
                    <Route path="profileemail" element={<ProfileChangeEmail />} />
                    <Route path="enrolledCourses" element={<EnrolledCourses />} />
                </Route>
            </Route>
        </Routes>
    )
}
export default UserRoute
