/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, } from "react"
import images from "../../../assets/images (1).png";
import { GetConversations } from "@/Api/trainer";
import moment from "moment";


interface Conversation {
    _id: string;
}
type Props = {
    currentUser: string | null,
    user:any| null,
    setUser: (user: any| null) => void
    currentChat: Conversation | null,
    setCurrentChat: (currentChat: Conversation | null) => void,
    conversations: Conversation[] | null,
    setConversations: (conversations: Conversation[] | null) => void
    unreadMessages: { [key: string]: number };
    lastClickedUser:any, 
    setLastClickedUser: (lastClickedUser: any)=>void
    userInfo: any
    setuserInfo: (userInfo: any) => void

}

const ChatTutors: FC<Props> = ({ user, currentUser, setCurrentChat, setConversations, unreadMessages,setLastClickedUser,setuserInfo}) => {
 

    const handleTrainerClick = async (tutorid:any,userDetails:any) => {
        try {
            setLastClickedUser(tutorid);
            setuserInfo(userDetails)
            const response = await GetConversations(currentUser,tutorid)
            console.log("conversations", response?.data.data)
            setConversations(response?.data.data)
            setCurrentChat(response?.data.data);
        } catch (error) {
            console.log(error)
        }
    }
    function dateFormate(date: Date) {
        const dateFomatted = moment(date).startOf("minute").fromNow();

        return dateFomatted;
    }


    return (
     
        <>
            {
                user && user?.map((users:any) => (
                    <div key={users?.userDetails._id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleTrainerClick(users?.userDetails._id, users?.userDetails)} >
                        <div className="relative w-12 h-12 mr-3">
                            {unreadMessages[users.userDetails._id] > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{unreadMessages[users.userDetails._id]}</span>
                            )}
                            <img
                                src={users.userDetails.profileimage ? users.userDetails.profileimage : images}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{users?.userDetails.name}</h2>
                        </div>
                        <p className="font-Poppins text-xs">
                            {dateFormate(users?.updationTime)}
                        </p>
                        
                    </div>
                    
                ))
            }
        </>

    )
}

export default ChatTutors


