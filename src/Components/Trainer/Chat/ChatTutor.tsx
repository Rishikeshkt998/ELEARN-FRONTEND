/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { FC, useEffect, useState } from "react"
import images from "../../../assets/images (1).png";
type User = {
    name: string;
    image?: string; // Assuming image is optional
}

type Props = {
    conversation: any,
    currentUser: string | null

}

const ChatTutor: FC<Props> = ({ conversation, currentUser }) => {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const userId = conversation.members.find((m: any) => m !== currentUser)
        console.log(userId)
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chat/findUserById/${userId}`)
                if (response !== null) {
                    console.log(response.data)
                    setUser(response.data.data)

                }





            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [currentUser, conversation])
    return (
        <div className="flex item-center py-8 border-b border-bottom-gray-300" key="">
            <div className="cursor-pointer flex items-center">
                <div>
                    <img src={user?.image ? user.image : images} className="rounded-full" width={30} height={20} />
                </div>
                <div className="ml-6">
                    <h3 className="text-sm font-semibold">{user?.name}</h3>
                    <p className="text-sm font-light text-gray-600">online</p>
                </div>
            </div>
        </div>
    )
}

export default ChatTutor
