import { Route, Routes } from "react-router-dom"

import TrainerLoggedOut from "../Components/Trainer/TrainerCheck/TranerLoggedOut"
import TrainerLoggedIn from "../Components/Trainer/TrainerCheck/TrainerLoggedIn"
import TrainerLogin from "../Pages/Trainer/TrainerLogin/TrainerLogin"
// import Trainerhome from "../Components/common/Trainerhome"
// import TrainerProfilepageContainer from "../Pages/Trainer/TrainerProfile/TrainerProfilepageContainer"
// import TrainerProfileeditContainer from "../Pages/Trainer/TrainerProfile/TrainerProfileeditContainer"
// import TrainerProfilepageChangepasswordContainer from "../Pages/Trainer/TrainerProfile/TrainerProfileChangepasswordContainer"

// import TrainerProfilepicturecontainer from "../Pages/Trainer/TrainerProfile/TrainerProfilepicturecontainer"
// import Hometutor from "../Components/common/Hometutor"
import TrainerProfileedit from "../Pages/Trainer/TrainerProfile/TrainerProfileedit"

// import TrainerHome from "../Pages/Trainer/TrainerHome/TrainerHome"
import Trainerprofilecontainer from "../Pages/Trainer/TrainerProfile/Trainerprofilecontainer"
// import Addcourse from "../Pages/Trainer/trainerCourses/Addcourse"
// import TrainerCoursePage from "../Pages/Trainer/trainerCourses/TrainerCoursePage"
// import Addchapter from "../Pages/Trainer/trainerCourses/Addchapter"
// import AddLesson from "../Pages/Trainer/trainerCourses/AddLessons"
import Courseview from "../Pages/Trainer/trainerCourses/Courseview"
// import Courseinformation from "../Pages/Trainer/trainerCourses/CourseInformation"
import CoursePage from "../Pages/Trainer/trainerCourses/CoursePage"
import CourseEditPage from "../Pages/Trainer/trainerCourseEdit/CourseEditPage"
import TrainerProfile from "../Pages/Trainer/TrainerProfile/TrainerProfilepage"
import TrainerProfilechangepassword from "../Pages/Trainer/TrainerProfile/TrainerProfilechangepassword"
import TrainerProfilePicture from "../Pages/Trainer/TrainerProfile/TrainerProfilepicture"
import Trainerdashboard from "../Components/common/TutorCommon/Trainerdashboard"
import EnrolledStudentsView from "../Pages/Trainer/trainerEnrolledstudents/EnrolledStudentsView"
// import ChatDashboardTutor from "@/Pages/Trainer/TutorChat/ChatDashboardTutor"
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
// import AddChapters from "../Pages/Trainer/trainerCourses/Chapterscrud"
// import CoursePage from "../Pages/Trainer/trainerCourses/CoursePage"
// import CoursePage from "../Pages/Trainer/trainerCourses/CoursePage"


const TrainerRoute = () => {
    return (
        <Routes>
            <Route path="" element={<TrainerLoggedOut />}>
                <Route path="login" element={<TrainerLogin />} />
                <Route path='forgottutorpassword' element={<Forgotpasswordtutor />} />
                <Route path='forgottutorpasswordotp' element={<ForgotpasswordOtptutor />} />
                <Route path='changepasswordtutor' element={<ChangePasswordTutor />} />
            </Route>
            <Route path="" element={<TrainerLoggedIn />}>
                <Route path="videocalltrainer/:roomID" element={<TrainerVideocall />} />
                <Route path="chattutor" element={<TutorChatPage />} />
                <Route path="" element={<Trainerprofilecontainer />}>
                    <Route path="home" element={<Trainerdashboard />} />
                    <Route path="edit" element={<TrainerProfileedit/>} />
                    {/* <Route path="add" element={<Addcourse />} /> */}
                    {/* <Route path="courses" element={<TrainerCoursePage />} /> */}
                    {/* <Route path="addchapter" element={<Addchapter />} /> */}
                    {/* <Route path="addlesson" element={<AddLesson />} /> */}
                    <Route path="courseview" element={<Courseview />} />
                    {/* <Route path="chapter" element={<AddChapters />} /> */}
                    {/* <Route path='courseinfo' element={<Courseinformation/>}/> */}
                    <Route path='coursepage' element={<CoursePage />} />
                    <Route path='editcourse/:courseId' element={<CourseEditPage />} />
                    <Route path="tutorprofile" element={<TrainerProfile />} />
                    <Route path="tutorprofileedit" element={<TrainerProfileedit/>} />
                    <Route path="trainerprofilechangepassword" element={<TrainerProfilechangepassword/>} />
                    <Route path="trainerprofilepic" element={<TrainerProfilePicture/>} />
                    <Route path="enrolled" element={<EnrolledStudentsView />} />
                    {/* <Route path="chat" element={<ChatDashboardTutor/>} /> */}
                    <Route path="shedule/:id" element={<SheduleClass />} />
                    <Route path="sheduleclassview" element={<SheduledclassView />} />
                    <Route path="reviewreply/:id" element={<CommentReplyContainer />} />
                    <Route path="questions/:id" element={<QuestionContainer/>} />
                    <Route path="trainerdashboard" element={<TrainerDashboard />} />


                    {/* <Route path="coursepage" element={<CoursePage />} /> */}
                </Route>     
            </Route>
        </Routes>
    )
}

export default TrainerRoute