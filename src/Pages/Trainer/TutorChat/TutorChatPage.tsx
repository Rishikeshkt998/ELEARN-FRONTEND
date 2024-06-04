/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Message from "@/Components/user/Message";
import io, { Socket } from 'socket.io-client'
import ChatTutors from "@/Components/Trainer/Chat/ChatTutors";
import MessageTutors from "@/Components/Trainer/Chat/MessageTutors";
import ScrollbleFeed from "react-scrollable-feed"
import { GetMessagesForTutor, MessagePost, NewMessageForTutor, fetchUsersForChat } from "@/Api/trainer";
// interface Conversation {
//     members: any;
//     _id: string;
//     // Add other properties if available 
// }

interface MessageData {
    senderId: string;
    message: string;
    creationTime:any
}
interface User {
    _id?: string;
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
    // const scrollRef = useRef<HTMLDivElement>()
    useEffect(() => {

        socket.current = io("ws://localhost:5000");
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
        // const userId = conversation.members.find((m: any) => m !== currentUser)
        // console.log(userId)
        const getUser = async () => {
            try {
                // const response = await axios.get(`http://localhost:5000/api/chat/findTutorById/${userId}`)
                // if (response !== null) {
                //     console.log(response.data)
                //     setUser(response.data.data)

                // }
                const response = await fetchUsersForChat()
                // await axios.get(`http://localhost:5000/api/chat/usersforchat`)
                if (response && response.data.findeduser) {
                    console.log("data", response.data.findeduser)
                    setUser(response.data.findeduser);
                    // for (const trainer of response.data.findedtrainer) {
                    //     const id = trainer.id;
                    //     console.log("id", id)
                    //     const newConversationResponse = await axios.post("http://localhost:5000/api/chat/newConversation", {
                    //         senderId: userId,
                    //         recieverId: id,
                    //     });
                    //     console.log("new", newConversationResponse)
                    // }
                    await Promise.all(response.data.findeduser.map(async (trainer: any) => {
                        const tutorid = trainer.id;
                        console.log("id", tutorid);
                        const newConversationResponse = await NewMessageForTutor(userId,tutorid)
                        // await axios.post("http://localhost:5000/api/chat/newConversation", {
                        //     senderId: userId,
                        //     receiverId: tutorid,
                        // });
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
                // axios.get(`http://localhost:5000/api/chat/getMessages/${currentChat[0]._id}`)
                console.log("message", res?.data.data)
                setMessages(res?.data.data)

            } catch (err) {
                console.log(err)
            }

        }
        getMessages()

    }, [currentChat])
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
            // axios.post("http://localhost:5000/api/chat/newMessage", message)
            console.log("message",res)
            setMessages([...messages, res?.data?.data])
            setNewMessage("");

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r border-gray-300">
                {/* Sidebar Header */}
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

                        {/* Chat Messages */}

                        <div className="h-full overflow-y-auto  bg-gray-100  pb-36">

                            {/* {messages.map((m, index) => (
                                <Messages message={m} own={m.senderId === userId} />
                            
                            ))} */}
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


                        {/* Chat Input */}
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

