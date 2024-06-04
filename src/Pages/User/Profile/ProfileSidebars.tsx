
import { Link } from 'react-router-dom'

const ProfileSidebars = () => {
  return (
      <ul className="bg-gray-800 text-gray-200 py-2 pb-24 rounded shadow-lg">
          <li className="hover:bg-gray-700 transform transition duration-300 hover:scale-105">
              <Link to="/profile" className="block py-3 px-4">
                  My profile
              </Link>
          </li>
          <li className="hover:bg-gray-700 transform transition duration-300 hover:scale-105">
              <Link to="/profile/profileedit" className="block py-3 px-4">
                  Edit Profile
              </Link>
          </li>
          <li className="hover:bg-gray-700 transform transition duration-300 hover:scale-105">
              <Link to="/profile/profilepicture" className="block py-3 px-4">
                  Upload profile pic
              </Link>
          </li>
          <li className="hover:bg-gray-700 transform transition duration-300 hover:scale-105">
              <Link to="/profile/profileemail" className="block py-3 px-4">
                  Change Email
              </Link>
          </li>
          <li className="hover:bg-gray-700 transform transition duration-300 hover:scale-105">
              <Link to="/profile/changepassword" className="block py-3 px-4">
                  Change password
              </Link>
          </li>
          
          <li className="hover:bg-gray-700 transform transition duration-300 hover:scale-105">
              <Link to="/profile/enrolledCourses" className="block py-3 px-4">
                  Enrolled Courses
              </Link>
          </li>
      </ul>
  )
}

export default ProfileSidebars

