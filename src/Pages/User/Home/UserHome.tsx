import Companies from "../../../Components/user/Companies"
import Courses from "../../../Components/user/Courses"

import Main from "../../../Components/user/Main"
import Footer from "../../../Components/common/UserCommon/Footer"
import NavBar from "../../../Components/common/UserCommon/Navbar"
import Tutorpage from "../../../Components/user/Tutorpage"
// import CourseCard from "../coursecards/CourseCard"
// import Courseview from "../../Trainer/trainerCourses/Courseview"
// import CourseCard from "../coursecards/CourseCard"




const UserHome = () => {
  return (
    <div>
      <NavBar/>     
      <Main/>
      <Companies/>
      <Courses/>
      <Tutorpage/>
      <Footer darkMode={false}/>
      

    
    </div>
  )
}

export default UserHome
