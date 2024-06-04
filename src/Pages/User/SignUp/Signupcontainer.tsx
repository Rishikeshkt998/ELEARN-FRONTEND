import Footer from "../../../Components/common/UserCommon/Footer"
import LandingNavbar from "../../../Components/common/UserCommon/LandingNavbar"
import SignUpForm from "./Signup"



const Signupcontainer = () => {
  return (
    <div>
        <LandingNavbar/>
        <SignUpForm/>


        <Footer darkMode={false}/>
      
    </div>
  )
}

export default Signupcontainer
