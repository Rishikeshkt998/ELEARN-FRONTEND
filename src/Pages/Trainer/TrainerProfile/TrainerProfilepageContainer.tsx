// import TrainerFooter from "../../../Components/common/TrainerFooter"
import Trainernavbars from "../../../Components/common/TutorCommon/Trainernavbars"
import Trainerside from "../../../Components/common/TutorCommon/Trainerside"
import TrainerProfile from "./TrainerProfilepage"


const TrainerProfilepageContainer = () => {
  return (
      <div>
          <Trainernavbars />
          <div className="flex overflow-hidden bg-white pt-16">
              <Trainerside />
              <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
              <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                  <TrainerProfile/>
                 
              </div>
          </div>

      </div>
  )
}

export default TrainerProfilepageContainer
