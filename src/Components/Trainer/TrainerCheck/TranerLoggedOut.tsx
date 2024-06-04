import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        tutorInfo: string
    }
}

const TrainerLoggedOut = () => {
    const tutorInfo = useSelector((state: RootState) => state.auth);
    return (
        tutorInfo.tutorInfo ? <Navigate to='/tutor/home' /> : <Outlet />
    )
}

export default TrainerLoggedOut