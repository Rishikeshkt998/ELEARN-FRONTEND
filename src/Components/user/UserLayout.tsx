import { Outlet } from "react-router-dom"
import Footer from "../common/UserCommon/Footer"
import Navbar from "../common/UserCommon/Navbar"


const UserLayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>

          <Footer darkMode={false} />
      
    </div>
  )
}

export default UserLayout
