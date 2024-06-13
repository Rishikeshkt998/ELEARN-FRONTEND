/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, } from "react"
import images from "../../../assets/images (1).png";
import { GetConversations } from "@/Api/trainer";


interface Conversation {
    _id: string;
}
type Props = {
    currentUser: string | null,
    user: User[] | null,
    setUser: (user: User[] | null) => void
    currentChat: Conversation | null,
    setCurrentChat: (currentChat: Conversation | null) => void,
    conversations: Conversation[] | null,
    setConversations: (conversations: Conversation[] | null) => void
    unreadMessages: { [key: string]: number };
    lastClickedUser:any, 
    setLastClickedUser: (lastClickedUser: any)=>void

}
interface User {
    id?: any;
    name: string;
    email: string;
    password: string,
    phone?: string,
    profileimage?: any;
    otp?: string;
    isVerified?: boolean,
    isBlocked?: boolean,

}
const ChatTutors: FC<Props> = ({ user, currentUser, setCurrentChat, setConversations, unreadMessages,setLastClickedUser}) => {
 

    const handleTrainerClick = async (tutorid:any) => {
        try {
            setLastClickedUser(tutorid);
            const response = await GetConversations(currentUser,tutorid)
            console.log("conversations", response?.data.data)
            setConversations(response?.data.data)
            setCurrentChat(response?.data.data);
        } catch (error) {
            console.log(error)
        }
    }


    return (
     
        <>
            {
                user && user?.map((users) => (
                    <div key={users?.id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleTrainerClick(users?.id)} >
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img
                                src={users.profileimage ? users.profileimage : images}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{users?.name}</h2>
                        </div>
                        {unreadMessages[users.id] > 0 && (
                            <span className="inline-block bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">{unreadMessages[users.id]}</span>
                        )}
                    </div>
                    
                ))
            }
        </>

    )
}

export default ChatTutors


