// import TrainerFooter from "../../../Components/common/TrainerFooter"
import Trainernavbars from "../../../Components/common/TutorCommon/Trainernavbars"
import Trainerside from "../../../Components/common/TutorCommon/Trainerside"
import TrainerProfileedit from "./TrainerProfileedit"

const TrainerProfileeditContainer = () => {
    return (
        <div>
            <Trainernavbars />
            <div className="flex overflow-hidden bg-white pt-16">
                <Trainerside />
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <TrainerProfileedit />
                    {/* <TrainerFooter />
                    <p className="text-center text-sm text-gray-500 my-10">
                        &copy; 2019-2021 <a href="#" className="hover:underline" target="_blank">Themesberg</a>. All rights reserved.
                    </p> */}
                </div>
            </div>

        </div>
    )
}

export default TrainerProfileeditContainer 