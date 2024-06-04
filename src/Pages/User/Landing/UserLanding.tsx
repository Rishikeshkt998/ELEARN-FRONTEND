import Companies from "../../../Components/user/Companies"
import Courses from "../../../Components/user/Courses"
import Main from "../../../Components/user/Main"
import Footer from "../../../Components/common/UserCommon/Footer"
import LandingNavbar from "../../../Components/common/UserCommon/LandingNavbar"




const UserHome = () => {
    return (
        <div>
            <LandingNavbar/>
            <Main />
            <Companies />
            <Courses />
            <Footer darkMode={false} />



        </div>
    )
}

export default UserHome
