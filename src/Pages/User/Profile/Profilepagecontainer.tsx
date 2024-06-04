import Footer from "../../../Components/common/UserCommon/Footer"
import Navbar from "../../../Components/common/UserCommon/Navbar"

import Profilepage from "./Profilepage"



const Profilepagecontainer = () => {
    return (
        <div>
            <Navbar />
            <Profilepage/>

            <Footer darkMode={false} />

        </div>
    )
}

export default Profilepagecontainer