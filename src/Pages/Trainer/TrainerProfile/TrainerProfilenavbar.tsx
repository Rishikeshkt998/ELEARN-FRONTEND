import { useState } from "react";
import { Link } from "react-router-dom"


const TrainerProfilenavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
  return (
    //   <nav className="relative bg-gray-800 flex items-center rounded-b justify-between sm:h-10 md:justify-center p-3 py-6 px-4">
      <nav className="relative bg-gray-800 flex flex-col md:flex-row items-center rounded-b justify-between sm:h-10 md:justify-center p-3 py-6 px-4 ">

          <div className="hidden md:flex md:space-x-10">
              <Link to="/tutor/tutorprofile" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">My Profile</Link>
              <Link to="/tutor/tutorprofileedit" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">Edit Profile</Link>
              <Link to="/tutor/trainerprofilepic" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">Upload Profile Pic</Link>
              <Link to="/tutor/trainerprofilechangepassword" className="font-medium text-gray-300 hover:text-gray-900 transition duration-150 ease-in-out">Change Password</Link>
          </div>
          <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-300 hover:text-gray-100 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {menuOpen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                  </svg>
              </button>
          </div>
          {
              menuOpen && (
                  <div className="mt-4 md:hidden flex flex-col items-center justify-center">
                      <Link
                          to="/tutor/tutorprofile"
                          className="block py-2 px-4 text-sm text-gray-300 hover:text-gray-100 transition duration-150 ease-in-out"
                      >
                          My Profile
                      </Link>
                      <Link
                          to="/tutor/tutorprofileedit"
                          className="block py-2 px-4 text-sm text-gray-300 hover:text-gray-100 transition duration-150 ease-in-out"
                      >
                          Edit Profile
                      </Link>
                      <Link
                          to="/tutor/trainerprofilepic"
                          className="block py-2 px-4 text-sm text-gray-300 hover:text-gray-100 transition duration-150 ease-in-out"
                      >
                          Upload Profile Pic
                      </Link>
                      <Link
                          to="/tutor/trainerprofilechangepassword"
                          className="block py-2 px-4 text-sm text-gray-300 hover:text-gray-100 transition duration-150 ease-in-out"
                      >
                          Change Password
                      </Link>
                  </div>
              )
          }
      </nav>
  )
}

export default TrainerProfilenavbar



