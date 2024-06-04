import Footer from "../../../Components/common/UserCommon/Footer"
import LandingNavbar from "../../../Components/common/UserCommon/LandingNavbar"
import SignInForm from "./SignInForm"


const LoginContainer = () => {
  return (
    <div>
        <LandingNavbar/>
        <SignInForm/>

        <Footer darkMode={false}/>
      
    </div>
  )
}

export default LoginContainer
