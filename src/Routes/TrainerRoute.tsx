import { Route, Routes } from "react-router-dom"
import TrainerLoggedOut from "../Components/Trainer/TrainerCheck/TranerLoggedOut"
import TrainerLoggedIn from "../Components/Trainer/TrainerCheck/TrainerLoggedIn"
import TrainerLogin from "../Pages/Trainer/TrainerLogin/TrainerLogin"
import TrainerProfileedit from "../Pages/Trainer/TrainerProfile/TrainerProfileedit"
import Trainerprofilecontainer from "../Pages/Trainer/TrainerProfile/Trainerprofilecontainer"
import Courseview from "../Pages/Trainer/trainerCourses/Courseview"
import CoursePage from "../Pages/Trainer/trainerCourses/CoursePage"
import CourseEditPage from "../Pages/Trainer/trainerCourseEdit/CourseEditPage"
import TrainerProfile from "../Pages/Trainer/TrainerProfile/TrainerProfilepage"
import TrainerProfilechangepassword from "../Pages/Trainer/TrainerProfile/TrainerProfilechangepassword"
import TrainerProfilePicture from "../Pages/Trainer/TrainerProfile/TrainerProfilepicture"
import Trainerdashboard from "../Components/common/TutorCommon/Trainerdashboard"
import EnrolledStudentsView from "../Pages/Trainer/trainerEnrolledstudents/EnrolledStudentsView"
import Forgotpasswordtutor from "@/Pages/Trainer/ForgotPasswordTutor/Forgotpasswordtutor"
import ForgotpasswordOtptutor from "@/Pages/Trainer/ForgotPasswordTutor/ForgotpasswordOtptutor"
import ChangePasswordTutor from "@/Pages/Trainer/ForgotPasswordTutor/ChangepasswordTutor"
import TutorChatPage from "@/Pages/Trainer/TutorChat/TutorChatPage"
import SheduleClass from "@/Pages/Trainer/Sheduleclass/SheduleClass"
import SheduledclassView from "@/Pages/Trainer/Sheduleclass/SheduledclassView"
import TrainerVideocall from "@/Pages/Trainer/TrainerVideocall/TrainerVideocall"
import CommentReplyContainer from "@/Pages/Trainer/commentreply/CommentReplyContainer"
import QuestionContainer from "@/Pages/Trainer/Questions/QuestionContainer"
import TrainerDashboard from "@/Pages/Trainer/TrainerDashboard/TrainerDashboard"
import Error404 from "@/Components/common/ErrorPage/Error404"
import Error500 from "@/Components/common/ErrorPage/Error500"



const TrainerRoute = () => {
    return (
        <Routes>
            <Route path="" element={<TrainerLoggedOut />}>
                <Route path="" element={<TrainerLogin />} />
                <Route path='forgottutorpassword' element={<Forgotpasswordtutor />} />
                <Route path='forgottutorpasswordotp' element={<ForgotpasswordOtptutor />} />
                <Route path='changepasswordtutor' element={<ChangePasswordTutor />} />
            </Route>
            <Route path="" element={<TrainerLoggedIn />}>
                <Route path="videocalltrainer/:roomID" element={<TrainerVideocall />} />
                <Route path="chattutor" element={<TutorChatPage />} />
                <Route path="/error404" element={<Error404 />} />
                <Route path="/error500" element={<Error500 />} />
                <Route path="" element={<Trainerprofilecontainer />}>
                    <Route path="home" element={<Trainerdashboard />} />
                    <Route path="edit" element={<TrainerProfileedit/>} />
                    <Route path="courseview" element={<Courseview />} />
                    <Route path='coursepage' element={<CoursePage />} />
                    <Route path='editcourse/:courseId' element={<CourseEditPage />} />
                    <Route path="tutorprofile" element={<TrainerProfile />} />
                    <Route path="tutorprofileedit" element={<TrainerProfileedit/>} />
                    <Route path="trainerprofilechangepassword" element={<TrainerProfilechangepassword/>} />
                    <Route path="trainerprofilepic" element={<TrainerProfilePicture/>} />
                    <Route path="enrolled" element={<EnrolledStudentsView />} />
                    <Route path="shedule/:id" element={<SheduleClass />} />
                    <Route path="sheduleclassview" element={<SheduledclassView />} />
                    <Route path="reviewreply/:id" element={<CommentReplyContainer />} />
                    <Route path="questions/:id" element={<QuestionContainer/>} />
                    <Route path="trainerdashboard" element={<TrainerDashboard />} />
                </Route>     
            </Route>
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default TrainerRoute