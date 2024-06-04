import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        tutorInfo: string
    }
}

const TrainerLoggedIn = () => {
    const tutorInfo = useSelector((state: RootState) => state.auth);
    return (
        tutorInfo.tutorInfo ?<Outlet /> : <Navigate to='/tutor/login' />
    )
}

export default TrainerLoggedIn