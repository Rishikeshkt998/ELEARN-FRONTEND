import PurchaseHistory from "@/Components/user/PurchaseHistory/PurchaseHistory"
import Footer from "../../../Components/common/UserCommon/Footer"
import Navbar from "../../../Components/common/UserCommon/Navbar"



const PurchaseHistoryContainer = () => {
    return (
        <div>
            <Navbar />
            <PurchaseHistory />

            <Footer darkMode={false} />

        </div>
    )
}

export default PurchaseHistoryContainer