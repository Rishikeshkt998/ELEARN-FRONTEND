/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useRef, useState } from "react";
import io, { Socket } from 'socket.io-client'
import Chatuserss from "@/Components/user/Chatuserss";
import Messages from "@/Components/user/Messages";
import ScrollbleFeed from "react-scrollable-feed"
import { ChatWithTutor, GetMessagesForUser, MessagePostUser, NewConversationWithTutor } from "@/Api/user";

interface MessageData {
    senderId: string;
    message: string;
    creationTime: any
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
const Chatpage: React.FC = () => {
    const userId = localStorage.getItem('userId') as string | null
    const [conversations, setConversations] = useState<any>([])
    const [currentChat, setCurrentChat] = useState<any>(null)
    const [messages, setMessages] = useState<MessageData[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState<MessageData | null>(null)
    const [user, setUser] = useState<Trainer[] | null>([])
    const socket: MutableRefObject<Socket | undefined> = useRef()
    useEffect(() => {

        socket.current = io("ws://localhost:5000");
        socket.current?.on("getMessage", (data: any) => {
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
        if (arrivalMessage && currentChat && currentChat[0].members.includes(arrivalMessage.senderId)) {
            setMessages(prev => [...prev, arrivalMessage]);

        }
    }, [arrivalMessage, currentChat]);
    useEffect(() => {
        const getUser = async () => {
            try {

                const response = await ChatWithTutor()
                // axios.get(`http://localhost:5000/api/chat/tutorschat`)
                if (response && response.data.findedtrainer) {
                    console.log("data", response.data.findedtrainer)
                    setUser(response.data.findedtrainer);


                    await Promise.all(response.data.findedtrainer.map(async (trainer: any) => {
                        const tutorid = trainer.id;
                        console.log("id", tutorid);
                        const newConversationResponse = await NewConversationWithTutor(userId, tutorid)
                        // axios.post("http://localhost:5000/api/chat/newConversation", {
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
                if (currentChat) {
                    const res = await GetMessagesForUser(currentChat[0]?._id)
                    // axios.get(`http://localhost:5000/api/chat/getMessages/${currentChat[0]?._id}`)
                    // console.log("message", res.data.data)
                    setMessages(res?.data.data)

                }




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
            conversationId: currentChat && currentChat[0]?._id
        }
        const recieverId = currentChat && currentChat[0]?.members.find((member: string | null) => member !== userId)
        console.log("recieverId", recieverId)
        socket.current?.emit("sendMessage", {
            senderId: userId,
            recieverId,
            message: newMessage
        })



        try {
            const res = await MessagePostUser(message)
            // axios.post("http://localhost:5000/api/chat/newMessage", message)
            console.log(res)
            setMessages([...messages, res?.data?.data])
            setNewMessage("");

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
                        <Chatuserss conversations={conversations} setConversations={setConversations} currentChat={currentChat} setCurrentChat={setCurrentChat} currentUser={userId} user={user} setUser={setUser} />

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
                                        <Messages key={index} message={m} own={m.senderId === userId} />
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

export default Chatpage;

