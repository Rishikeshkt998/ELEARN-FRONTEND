
import AdminNavbar from "../../../Components/common/AdminCommon/AdminNavbar"
import Sidebar from "../../../Components/common/AdminCommon/Sidebar"
import AdminDasboard from "../Dashboard/AdminDasboard"


const AdminHome:React.FC=()=> {
  return (
      <>
      <div className="bg-white">
        <AdminNavbar/>
        <div className="flex overflow-hidden bg-white pt-16">
          <Sidebar/>
          <div className="bg-white opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
          <div id="main-content" className="h-full w-full bg-white  overflow-y-auto lg:ml-64">
            <AdminDasboard />
          </div>
        </div>

      </div>
      </>
  )
}

export default AdminHome
