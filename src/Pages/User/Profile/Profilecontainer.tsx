import { Outlet } from "react-router-dom"
import Footer from "../../../Components/common/UserCommon/Footer"
import Navbar from "../../../Components/common/UserCommon/Navbar"
import ProfileSidebars from "./ProfileSidebars"


const Profilecontainer = () => {
    
    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-gray-900 pt-14">
                <div className="bg-gray-900 w-72 h-screen text-gray-200 p-3 border-t-4 border-green-400">
                    <ProfileSidebars />
                </div>
                
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-900 relative overflow-y-auto lg:ml-8">
                    <Outlet />

                </div>
            </div>
            
            <Footer darkMode={false} />
        </div>

    )
}

export default Profilecontainer
