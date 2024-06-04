

import Main from "@/Components/user/Main"
import LandingNavbar from "./LandingNavbar"
import Companies from "@/Components/user/Companies"
import Courses from "@/Components/user/Courses"
import Footer from "./Footer"

const UserLanding = () => {
  return (
      <div>


          <LandingNavbar />
          <Main/>
          <Companies />
          <Courses />
          <Footer darkMode={false}/>

      </div>
  )
}

export default UserLanding
