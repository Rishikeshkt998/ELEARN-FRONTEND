import Footer from "../../../Components/common/UserCommon/Footer"
import Navbar from "../../../Components/common/UserCommon/Navbar"

import Profilepicture from "./Profilepicture"



const ProfilepictureContainer = () => {
    return (
        <div>
            <Navbar />
            <Profilepicture/>

            <Footer darkMode={false} />

        </div>
    )
}

export default ProfilepictureContainer