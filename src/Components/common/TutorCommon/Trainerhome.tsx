// import TrainerFooter from "./TutorCommon/TrainerFooter"
// import Trainerdashboard from "./TutorCommon/Trainerdashboard"
// import Trainernavbars from "./TutorCommon/Trainernavbars"
// import Trainerside from "./TutorCommon/Trainerside"

import TrainerFooter from "./TrainerFooter"
import Trainerdashboard from "./Trainerdashboard"
import Trainernavbars from "./Trainernavbars"
import Trainerside from "./Trainerside"

const Trainerhome = () => {
  return (
     <div>
            <Trainernavbars/>
            <div className="flex overflow-hidden bg-white pt-16">
            <Trainerside/>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                <Trainerdashboard/>
                <TrainerFooter/>
              <p className="text-center text-sm text-gray-500 my-10">
                  &copy; 2019-2021 <a href="#" className="hover:underline" target="_blank">Themesberg</a>. All rights reserved.
              </p>
            </div>
          </div>

        </div>
      
  )
}

export default Trainerhome
