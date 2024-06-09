/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, } from "react"
import images from "../../assets/images (1).png";
import { getConversationtrainer } from "@/Api/user";


interface Conversation {
    _id: string;
    
}
type Props = {
  
    currentUser: string | null,
    user: Trainer[] | null,
    setUser: (user: Trainer[] | null) => void
    currentChat: Conversation []| null,
    setCurrentChat: (currentChat: Conversation [] | null) => void,
    conversations: Conversation[] | null,
    setConversations: (conversations: Conversation[] | null)=>void

}
interface Trainer {
    image: any;
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    dateOfBirth?: unknown;
    isVerified?: boolean;
    isBlocked?: boolean;
}

const Chatuserss: FC<Props> = ({  user, currentUser, setCurrentChat ,setConversations}) => {
   
        const handleTrainerClick =async (tutorid:string) => {
            try {
                const response = await getConversationtrainer(currentUser,tutorid)
                // axios.get(`http://localhost:5000/api/user/getConversation/${currentUser}/${tutorid}`)
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
                user?.map((users) => (
                    <div key={users?.id} className="flex items-center mb-4 cursor-pointer  hover:bg-gray-100 p-2 rounded-md" onClick={()=>handleTrainerClick(users.id)} >
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img
                                src={users.image ? users.image : images}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{users?.name}</h2>
                        </div>
                    </div>
                ))
            }
        </>

    )
}

export default Chatuserss
