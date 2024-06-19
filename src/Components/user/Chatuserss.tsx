/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC} from "react"
import images from "../../assets/images (1).png";
import { getConversationtrainer } from "@/Api/user";
import moment from "moment";


interface Conversation {
    _id: string;

}
type Props = {

    currentUser: string | null,
    user: any| null,
    setUser: (user:any) => void
    currentChat: Conversation []| null,
    setCurrentChat: (currentChat: Conversation [] | null) => void,
    conversations: Conversation[] | null,
    setConversations: (conversations: Conversation[] | null)=>void
    unreadMessages: { [key: string]: number };
    tutorInfo:any
    settutorInfo: (tutorInfo: any)=>void

}
// interface Trainer {
//     instructorDetails: any;
//     image: any;
//     _id: string;
//     name: string;
//     email: string;
//     password: string;
//     phone?: string;
//     dateOfBirth?: unknown;
//     isVerified?: boolean;
//     isBlocked?: boolean;
// }

const Chatuserss: FC<Props> = ({ user, currentUser,unreadMessages,  setCurrentChat ,setConversations,settutorInfo}) => {
        const handleTrainerClick =async (tutorid:string,instructorDetails:any) => {
            try {
                settutorInfo(instructorDetails)
                const response = await getConversationtrainer(currentUser,tutorid)
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
                user?.map((users:any) => (
                    <div key={users?.instructorDetails._id} className="flex items-center mb-4 cursor-pointer  hover:bg-gray-100 p-2 rounded-md" onClick={() => handleTrainerClick(users.instructorDetails._id,users.instructorDetails)} >
                        <div className="relative w-12 h-12 mr-3">
                            {unreadMessages[users.instructorDetails._id] > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{unreadMessages[users.instructorDetails._id]}</span>
                            )}
                            <img
                                src={users.instructorDetails.image ? users.instructorDetails.image : images}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{users?.instructorDetails?.name}</h2>
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

export default Chatuserss

// import { FC } from "react";
// import images from "../../assets/images (1).png";
// import { getConversationtrainer } from "@/Api/user";
// import moment from "moment";

// interface Conversation {
//     _id: string;
// }

// type Props = {
//     currentUser: string | null;
//     user: any | null;
//     setUser: (user: any) => void;
//     currentChat: Conversation[] | null;
//     setCurrentChat: (currentChat: Conversation[] | null) => void;
//     conversations: Conversation[] | null;
//     setConversations: (conversations: Conversation[] | null) => void;
//     unreadMessages: { [key: string]: number };
//     tutorInfo: any;
//     settutorInfo: (tutorInfo: any) => void;
// };

// const Chatuserss: FC<Props> = ({
//     user,
//     currentUser,
//     unreadMessages,
//     setCurrentChat,
//     setConversations,
//     settutorInfo,
// }) => {
//     const handleTrainerClick = async (tutorid: string, instructorDetails: any) => {
//         try {
//             settutorInfo(instructorDetails);
//             const response = await getConversationtrainer(currentUser, tutorid);
//             console.log("conversations", response?.data.data);
//             setConversations(response?.data.data);
//             setCurrentChat(response?.data.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     function dateFormate(date: Date) {
//         const dateFormatted = moment(date).startOf("minute").fromNow();
//         return dateFormatted;
//     }

//     return (
//         <>
//             {user?.map((users: any) => (
//                 <div
//                     key={users?.instructorDetails._id}
//                     className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md relative"
//                     onClick={() =>
//                         handleTrainerClick(users.instructorDetails._id, users.instructorDetails)
//                     }
//                 >
//                     <div className="relative w-12 h-12 mr-3">
//                         {unreadMessages[users.instructorDetails._id] > 0 && (
//                             <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
//                                 {unreadMessages[users.instructorDetails._id]}
//                             </span>
//                         )}
//                         <img
//                             src={users.instructorDetails.image ? users.instructorDetails.image : images}
//                             alt="User Avatar"
//                             className="w-12 h-12 rounded-full"
//                         />
//                     </div>
//                     <div className="flex-1">
//                         <h2 className="text-lg font-semibold">{users?.instructorDetails?.name}</h2>
//                         <p className="font-Poppins text-xs">{dateFormate(users?.updationTime)}</p>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default Chatuserss;



