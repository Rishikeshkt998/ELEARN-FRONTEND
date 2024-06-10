import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../../../store/slice/authSlice";
import { toast } from "react-toastify";
import { adminLogoutRoute } from "../../../Api/admin";

const Sidebar: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await adminLogoutRoute()
            if (res?.data.success) {
                dispatch(adminLogout())
                localStorage.removeItem("adminToken");
                toast.success('Logged out successfully..')
                navigate('/admin')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <aside
                id="sidebar"
                className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 bg-gray-800 text-white"
                aria-label="Sidebar"
            >
                <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-800 pt-0">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 bg-gray-800 divide-y divide-gray-200 space-y-1">
                            <ul className="space-y-2 pb-2">
                               
                                <li className="border border-gray-300 rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-700">
                                    <a
                                        href="#"
                                        className="text-base font-normal flex items-center p-2 group"
                                    >
                                        <Link to="/admin/courseanalytics" className="ml-3 flex-1 whitespace-nowrap">Dashboard</Link>
                                    </a>
                                </li>
                                <li className="border border-gray-300 rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-700">
                                    <a
                                        href="#"
                                        className="text-base font-normal flex items-center p-2 group"
                                    >
                                        <Link to="/admin/user" className="ml-3 flex-1 whitespace-nowrap">Users</Link>
                                    </a>
                                </li>
                                <li className="border border-gray-300 rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-700">
                                    <a
                                        href="#"
                                        className="text-base font-normal flex items-center p-2 group"
                                    >
                                        <Link to="/admin/courseview" className="ml-3 flex-1 whitespace-nowrap">Courses</Link>
                                    </a>
                                </li>
                                <li className="border border-gray-300 rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-700">
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-base font-normal flex items-center p-2 group"
                                    >
                                        <Link to="/admin/categoryview" className="ml-3 flex-1 whitespace-nowrap">Category</Link>
                                    </a>
                                </li>
                                <li className="border border-gray-300 rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-700">
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-base font-normal flex items-center p-2 group"
                                    >
                                        <Link to="/admin/categoryview" className="ml-3 flex-1 whitespace-nowrap">Invoice</Link>
                                    </a>
                                </li>
                                <li className="border border-gray-300 rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-700">
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-base font-normal flex items-center p-2 group"
                                    >
                                        <Link to="/admin/tutorview" className="ml-3 flex-1 whitespace-nowrap">Instructors</Link>
                                    </a>
                                </li>
                                <li className="border border-gray-300 rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-700">
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-base font-normal flex items-center p-2 group"
                                    >
                                        <Link to="/admin/categoryview" onClick={handleLogout} className="ml-3 flex-1 whitespace-nowrap">Logout</Link>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
    </>
        
            
           
        
    );
};

export default Sidebar