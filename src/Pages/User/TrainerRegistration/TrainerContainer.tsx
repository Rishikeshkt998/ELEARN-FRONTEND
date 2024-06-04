
import Navbar from "@/Components/common/UserCommon/Navbar"
import Footer from "../../../Components/common/UserCommon/Footer"
import TrainerRegistration from "./TrainerRegistration"

const TrainerContainer = () => {
    return (
        <div>
            <Navbar />
            <TrainerRegistration/>


            <Footer darkMode={false} />

        </div>
    )
}

export default TrainerContainer