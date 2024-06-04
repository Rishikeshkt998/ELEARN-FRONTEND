
import Navbar from "@/Components/common/UserCommon/Navbar"
import Footer from "../../../Components/common/UserCommon/Footer"

import TrainerOtp from "./TrainerOtp"



const TrainerOtpContainer = () => {
    return (
        <div>
            <Navbar />
            <TrainerOtp />

            <Footer darkMode={false} />

        </div>
    )
}

export default TrainerOtpContainer