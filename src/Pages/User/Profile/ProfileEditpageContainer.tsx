import Footer from "../../../Components/common/UserCommon/Footer"

import Navbar from "../../../Components/common/UserCommon/Navbar"
import ProfileEditpage from "./ProfileEditpage"




const ProfileEditPageContainer = () => {
    return (
        <div>
            <Navbar />
            <ProfileEditpage/>

            <Footer darkMode={false} />

        </div>
    )
}

export default ProfileEditPageContainer