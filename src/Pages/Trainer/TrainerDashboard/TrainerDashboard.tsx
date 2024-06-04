import CourseAnalyticsTutor from "@/Components/Trainer/CourseAnalytics/CourseAnalyticsTutor"
import OrderAnalyticsTutor from "@/Components/Trainer/OrderAnalytics/OrderAnalyticsTutor"
import UserAnalyticsTutor from "@/Components/Trainer/UserAnalytics/UserAnalyticsTutor"



const TrainerDashboard = () => {
  return (
      <>
          <div className="bg-gray-900">
              <CourseAnalyticsTutor />
              <div className="flex bg-gray-900">
                  <div className="flex-1">
                      <UserAnalyticsTutor isDashboard={true} />
                  </div>
                  <div className="flex-1">
                      <OrderAnalyticsTutor isDashboard={true} />
                  </div>
              </div>
          </div>
      </>
  )
}

export default TrainerDashboard
