
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        userInfo: string;
    }
}

const UserLoggedIn = () => {
    const userInfo = useSelector((state: RootState) => state.auth);
    return (
        userInfo.userInfo ? < Outlet /> : <Navigate to='/' />
    )
}

export default UserLoggedIn