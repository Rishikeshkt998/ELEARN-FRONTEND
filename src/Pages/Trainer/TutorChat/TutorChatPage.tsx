/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useRef, useState } from "react";

import io, { Socket } from 'socket.io-client'
import ChatTutors from "@/Components/Trainer/Chat/ChatTutors";
import MessageTutors from "@/Components/Trainer/Chat/MessageTutors";
import ScrollbleFeed from "react-scrollable-feed"
import { GetMessagesForTutor, MessagePost, NewMessageForTutor, fetchUsersForChat } from "@/Api/trainer";


interface MessageData {
    senderId: string;
    message: string;
    creationTime:any
}
interface User {
    id?: string;
    name: string;
    email: string;
    password: string,
    phone?: string,
    profileimage?: any;
    otp?: string;
    isVerified?: boolean,
    isBlocked?: boolean,

}
const TutorChatPage: React.FC = () => {
    const userId = localStorage.getItem('trainerId') as string | null
    const [conversations, setConversations] = useState<any>([])
    const [currentChat, setCurrentChat] = useState<any | null>(null)
    const [messages, setMessages] = useState<MessageData[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState<MessageData | null>(null)
    const [user, setUser] = useState<User[] | null>([])
    const socket: MutableRefObject<Socket | undefined> = useRef()
    useEffect(() => {

        socket.current = io(import.meta.env.VITE_SOCKETIO_URL)
        socket.current?.on("getMessage", data => {
            console.log("userdata", data)
            setArrivalMessage({
                senderId: data.senderId,
                message: data.message,
                creationTime: Date.now()
            })
            console.log(arrivalMessage)

        })

    }, [])
    useEffect(() => {
        socket.current?.emit("addUser", userId)
        socket.current?.on("getUsers", users => {
            console.log("users", users)
        })


    }, [])
    useEffect(() => {
        arrivalMessage && currentChat&& currentChat[0]?.members.includes(arrivalMessage.senderId) &&
            setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        
        const getUser = async () => {
            try {
                
                const response = await fetchUsersForChat()
                if (response && response.data.findeduser) {
                    console.log("data", response.data.findeduser)
                    setUser(response.data.findeduser);
                    await Promise.all(response.data.findeduser.map(async (trainer: any) => {
                        const tutorid = trainer.id;
                        console.log("id", tutorid);
                        const newConversationResponse = await NewMessageForTutor(userId,tutorid)
                        console.log("new", newConversationResponse);

                    }));

                }



            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [userId])

    console.log("currentchat", currentChat)
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await GetMessagesForTutor(currentChat[0]?._id)
                console.log("message", res?.data.data)
                const messagesdata = res?.data.data;
                console.log("message for sorting", messagesdata)
                
                setMessages(res?.data.data)

            } catch (err) {
                console.log(err)
            }

        }
        getMessages()

    }, [currentChat])
    
    useEffect(() => {
        if (arrivalMessage) {
            const updatedUsers = user?.filter(u => u.id !== arrivalMessage.senderId) ?? [];
            console.log("updated uservalues", updatedUsers);
            const involvedUser = user?.find(u => u.id === arrivalMessage.senderId);
            console.log("involved user values", involvedUser);

            if (involvedUser) {
                setUser([involvedUser, ...updatedUsers]);
            }
        }
    }, [arrivalMessage]);
    console.log("messages", messages)
    console.log("userId", userId)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const message = {
            senderId: userId,
            message: newMessage,
            conversationId: currentChat&& currentChat[0]?._id
        }
        const recieverId = currentChat&&currentChat[0].members.find((member: string | null) => member !== userId)
        console.log("recieverId", recieverId)
        socket.current?.emit("sendMessage", {
            senderId: userId,
            recieverId,
            message: newMessage
        })

        try {
            const res = await  MessagePost(message)
            console.log("message",res)
            setMessages([...messages, res?.data?.data])
            setNewMessage("");
            if (res && res.data && recieverId) {
                const updatedUsers = user?.filter(u => u.id !== recieverId) ?? [];
                console.log("updated user", updatedUsers);
                const involvedUser = user?.find(u => u.id === recieverId);
                console.log("involved user", involvedUser);

                if (involvedUser) {
                    setUser([involvedUser, ...updatedUsers]);
                }
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/4 bg-white border-r border-gray-300">
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                    <h1 className="text-2xl font-semibold">ELEARN</h1>
                    <div className="relative">
                        <button id="menuButton" className="focus:outline-none">

                        </button>

                    </div>
                </header>
                <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
         
                    <div>
                        <ChatTutors conversations={conversations} setConversations={setConversations} currentChat={currentChat} setCurrentChat={setCurrentChat} currentUser={userId} user={user} setUser={setUser} />

                    </div>
                </div>
            </div>


            <div className="flex-1">
                {
                    currentChat ? (<>

                        <header className="bg-white p-4 text-gray-700">
                            <h1 className="text-2xl font-semibold">Alice</h1>
                        </header>
                        <div className="h-full overflow-y-auto  bg-gray-100  pb-36">
                            <ScrollbleFeed>
                            {messages && messages.length === 0 ? (
                                <div className="text-center">Start a conversation</div>
                            ) : (
                                messages.map((m, index) => (
                                    <MessageTutors key={index} message={m} own={m.senderId === userId} />
                                ))
                            )}
                            </ScrollbleFeed>

                        </div>
                        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                    className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                                />
                                <button onClick={handleSubmit} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                            </div>
                        </footer>
                    </>) : (<div className="p-64 bg-gray-100">Open a conversation to start a chat</div>)
                }
            </div>

        </div>
    );
};

export default TutorChatPage;


