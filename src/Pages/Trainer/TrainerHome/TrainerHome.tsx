import { Outlet } from "react-router-dom"
import TrainerNavbar from "../../../Components/common/TutorCommon/TrainerNavbar"
import Trainerside from "../../../Components/common/TutorCommon/Trainerside"



const TrainerHome: React.FC = () => {
  return (
        <div className="bg-gray-700">
            <TrainerNavbar />
            <div className="flex overflow-hidden bg-gray-700 pt-16">
                <Trainerside />
                <div className="bg-gray-700 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-700 relative overflow-y-auto lg:ml-64">
                    <Outlet />
                </div>
            </div>

        </div>
  )
}

export default TrainerHome
