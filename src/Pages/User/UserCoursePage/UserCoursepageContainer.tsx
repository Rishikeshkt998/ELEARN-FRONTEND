import Footer from "@/Components/common/UserCommon/Footer"
import NavBar from "@/Components/common/UserCommon/Navbar"

import UserCard from "./UserCard"

const UserCoursepageContainer = () => {
    return (
        <div>
            <NavBar />
            <UserCard />
            <Footer darkMode={false} />



        </div>
    )
}

export default UserCoursepageContainer