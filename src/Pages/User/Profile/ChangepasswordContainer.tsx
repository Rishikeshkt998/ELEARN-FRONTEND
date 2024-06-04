import Footer from "../../../Components/common/UserCommon/Footer"
import Navbar from "../../../Components/common/UserCommon/Navbar"
import Changepassword from "./Changepassword"




const ChangepasswordContainer = () => {
    return (
        <div>
            <Navbar />
           <Changepassword/>

            <Footer darkMode={false} />

        </div>
    )
}

export default ChangepasswordContainer