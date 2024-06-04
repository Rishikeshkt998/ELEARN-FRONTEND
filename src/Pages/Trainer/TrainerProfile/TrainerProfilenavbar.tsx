import { Link } from "react-router-dom"


const TrainerProfilenavbar = () => {
  return (
      <nav className="relative bg-white flex items-center rounded-b justify-between sm:h-10 md:justify-center p-3 py-6 px-4">

          <div className="hidden md:flex md:space-x-10">
              <Link to="/tutor/tutorprofile" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">My Profile</Link>
              <Link to="/tutor/tutorprofileedit" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">Edit Profile</Link>
              <Link to="/tutor/trainerprofilepic" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">Upload Profile Pic</Link>
              <Link to="/tutor/trainerprofilechangepassword" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">Change Password</Link>
              <Link to="/blog" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">Change Email</Link>
          </div>
      </nav>
  )
}

export default TrainerProfilenavbar
