import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        userInfo: string,
    }
}

const UserLoggedOut = () => {
    const userInfo = useSelector((state: RootState) => state.auth);
    return (
        userInfo.userInfo? <Navigate to='/home' /> : <Outlet />
    )
}

export default UserLoggedOut