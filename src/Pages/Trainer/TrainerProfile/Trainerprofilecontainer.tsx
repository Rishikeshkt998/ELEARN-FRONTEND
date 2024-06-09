
import { Outlet } from "react-router-dom"
import Trainernavbars from "../../../Components/common/TutorCommon/Trainernavbars"
import Trainerside from "../../../Components/common/TutorCommon/Trainerside"




const Trainerprofilecontainer= () => {
    return (
        <div>
            <Trainernavbars />
            <div className="flex overflow-hidden bg-gray-900 pt-16">
                <Trainerside />
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-900 relative overflow-y-auto lg:ml-64">
                    <Outlet/>

                </div>
            </div>

        </div>
    )
}

export default Trainerprofilecontainer