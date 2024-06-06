import AdminLogin from "../Pages/Admin/Login/AdminLogin"
import { Route, Routes } from 'react-router-dom'
import AdminLoggedIn from "../Components/admin/AdminCommon/AdminLoggedIn"
import AdminLoggedOut from "../Components/admin/AdminCommon/AdminLoggedOut"
import AdminHome from "../Pages/Admin/Home/AdminHome"
import CategoryPage from "../Pages/Admin/category/CategoryPage"
import CategoryAddPage from "../Pages/Admin/category/CategoryAddPage"
import CategoryEditPage from "../Pages/Admin/category/CategoryEdiPage"
import UserContainer from "../Pages/Admin/User/UserContainer"
import Tutorcontainer from "../Pages/Admin/Tutor/Tutorcontainer"
import CoursePage from "@/Pages/Admin/Courses/CoursePage"
import AdminDasboard from "@/Pages/Admin/Dashboard/AdminDasboard"



const AdminRoute = () => {
    return (

        <Routes>
            <Route path='' element={<AdminLoggedOut />}>
                <Route path="" element={<AdminLogin />} />
            </Route>
            <Route path='' element={<AdminLoggedIn />}>
                <Route path='dashboard' element={<AdminHome />} />
                <Route path='user' element={<UserContainer />} />
                <Route path="categoryview" element={<CategoryPage/>} />
                <Route path="addcategory" element={<CategoryAddPage />} />
                <Route path="editcategory/:id" element={<CategoryEditPage/>} />
                <Route path="tutorview" element={<Tutorcontainer/>} />
                <Route path="courseview" element={<CoursePage/>} />
                <Route path="courseanalytics" element={<AdminDasboard />} />
            </Route>
        </Routes>
    )
}

export default AdminRoute
