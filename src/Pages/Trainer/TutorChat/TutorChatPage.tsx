/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { MutableRefObject, useEffect, useRef, useState } from "react";
import io, { Socket } from 'socket.io-client';
import ChatTutors from "@/Components/Trainer/Chat/ChatTutors";
import MessageTutors from "@/Components/Trainer/Chat/MessageTutors";
import ScrollbleFeed from "react-scrollable-feed";
import { FilePost, GetMessagesForTutor, MessagePost, MessageRead, NewMessageForTutor, fetchUsersForChat } from "@/Api/trainer";
import { FaFile, FaImage, FaPaperclip, FaVideo } from "react-icons/fa";
import { UploadS3Bucket } from "@/Services/S3bucket";
import InputEmoji from "react-input-emoji";

interface MessageData {
    senderId: string;
    message: string;
    contentType: any;
    creationTime: any;
    status: 'read' | 'unread';
}
interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    profileimage?: any;
    otp?: string;
    isVerified?: boolean;
    isBlocked?: boolean;
}
enum ContentType {
    VIDEO = 'video',
    IMAGE = 'image',
    FILE = 'file',
    TEXT = 'text'
}
const TutorChatPage: React.FC = () => {
    const userId = localStorage.getItem('trainerId') as string | null;
    const [conversations, setConversations] = useState<any>([]);
    const [currentChat, setCurrentChat] = useState<any | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState<MessageData | null>(null);
    const [user, setUser] = useState<User[] | null>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [fileurl, setFileUrl] = useState("")
    const [dummyState, setDummyState] = useState(false);

    const socket: MutableRefObject<Socket | undefined> = useRef();

    useEffect(() => {

        socket.current = io(import.meta.env.VITE_SOCKETIO_URL)
        socket.current?.on("getMessage", data => {
            console.log("userdata", data)
            setArrivalMessage({
                senderId: data.senderId,
                message: data.message,
                contentType: data.contentType,
                creationTime: Date.now(),
                status: data.status
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
        arrivalMessage && currentChat && currentChat[0]?.members.includes(arrivalMessage.senderId) &&
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
                        const newConversationResponse = await NewMessageForTutor(userId, tutorid)
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
                // const messagesWithStatus = messagesdata?.map((message:any) => ({
                //     ...message 
                // }));
                // setMessages(messagesWithStatus);
                const messagesWithStatus = messagesdata?.map((message: any) => {
                    const own = message?.senderId === userId
                    if (message?.status === 'unread' && !own) {
                        console.log("messageid", message._id)
                        markMessageAsRead(message._id);

                    }

 
                    return {
                        ...message,
                        status: message.status === 'unread' ? 'unread' : message.status
                    };
                });

                setMessages(messagesWithStatus);
                
            } catch (err) {
                console.log(err)
            }

        }
        getMessages()
       
    }, [currentChat, userId])
    const markMessageAsRead = async (messageId: string) => {
        try {
            
            const response = await MessageRead(messageId);
            console.log("messageread", response)
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

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
            contentType: ContentType.TEXT,
            conversationId: currentChat && currentChat[0]?._id
        }
        const recieverId = currentChat && currentChat[0].members.find((member: string | null) => member !== userId)
        console.log("recieverId", recieverId)
        socket.current?.emit("sendMessage", {
            senderId: userId,
            recieverId,
            contentType: ContentType.TEXT,
            message: newMessage
        })

        try {
            const res = await MessagePost(message)
            console.log("message", res)
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, contentType: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAttachedFile(file);
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFilePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setFilePreview(file.name);
            }
            try {
                setLoading(true);
                const url = await UploadS3Bucket(file);
                console.log(url);
                setFileUrl(url.url);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error uploading to S3:", error);
            }

            setIsModalOpen(true);
            setIsMenuOpen(false);
        }
    };
    const handleFileSubmit = async (e: any, contentType: any) => {
        e.preventDefault();

        const message = {
            senderId: userId,
            message: fileurl,
            contentType: contentType,
            conversationId: currentChat && currentChat[0]?._id,

        };
        const recieverId = currentChat && currentChat[0].members.find((member: string | null) => member !== userId);

        socket.current?.emit('sendMessage', {
            senderId: userId,
            recieverId,
            message: fileurl,
            contentType: contentType,
        });

        try {
            const res = await FilePost(message);
            setMessages([...messages, res?.data?.data]);
            setNewMessage('');
            if (res && res.data && recieverId) {
                const updatedUsers = user?.filter((u) => u.id !== recieverId) ?? [];
                const involvedUser = user?.find((u) => u.id === recieverId);
                if (involvedUser) {
                    setUser([involvedUser, ...updatedUsers]);
                }
            }
        } catch (err) {
            console.log(err);
        }
        setAttachedFile(null);
        setFilePreview(null);
        setIsModalOpen(false);
    };



    const handleModalClose = () => {
        setIsModalOpen(false);
        setAttachedFile(null);
        setFilePreview(null);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/4 bg-white border-r hidden md:block border-gray-300">
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                    <h1 className="text-2xl font-semibold">ELEARN</h1>
                    <div className="relative">
                        <button id="menuButton" className="focus:outline-none"></button>
                    </div>
                </header>
                <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                    <div>
                        <ChatTutors
                            conversations={conversations}
                            setConversations={setConversations}
                            currentChat={currentChat}
                            setCurrentChat={setCurrentChat}
                            currentUser={userId}
                            user={user}
                            setUser={setUser}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                {currentChat ? (
                    <>
                        <header className="bg-white p-4 text-gray-700">
                            <h1 className="text-2xl font-semibold">Alice</h1>
                        </header>
                        <div className="h-full overflow-y-auto bg-gray-100 pb-36">
                            <ScrollbleFeed>
                                {messages && messages.length === 0 ? (
                                    <div className="text-center">Start a conversation</div>
                                ) : (
                                    messages.map((m, index) => (
                                        <MessageTutors key={index} message={m} own={m?.senderId === userId} />
                                    ))
                                )}
                            </ScrollbleFeed>
                        </div>
                        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full md:w-3/4">
                            <div className="flex items-center sm:w-full">
                                <div className="flex-1 flex items-center">
                                    <InputEmoji
                                        value={newMessage}
                                        placeholder="Type a message..."
                                        onChange={(text) => {
                                            setNewMessage(text);
                                            setDummyState(prevState => !prevState);
                                        }}
                                        shouldReturn={false}
                                        shouldConvertEmojiToImage={false} />


                                </div>
                                <div className="relative">
                                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-gray-300 text-gray-700 px-5 py-3 rounded-md ml-2">
                                        <FaPaperclip />
                                    </button>
                                    {isMenuOpen && (
                                        <div className="absolute bottom-12 right-0 bg-white shadow-md rounded-md p-2 flex flex-col items-center">
                                            <label className="cursor-pointer flex items-center mb-2">
                                                <FaImage size={20} />
                                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, ContentType.IMAGE)} className="hidden" />
                                            </label>
                                            <label className="cursor-pointer flex items-center mb-2">
                                                <FaVideo size={20} />
                                                <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, ContentType.VIDEO)} className="hidden" />
                                            </label>
                                            <label className="cursor-pointer flex items-center">
                                                <FaFile size={20} />
                                                <input type="file" accept="application/*" onChange={(e) => handleFileChange(e, ContentType.FILE)} className="hidden" />
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <button onClick={handleSubmit} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                                    Send
                                </button>
                            </div>
                        </footer>
                    </>
                ) : (
                    <div className="p-64 bg-gray-100">Open a conversation to start a chat</div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
                        <h2 className="text-2xl mb-4">File Preview</h2>
                        {attachedFile?.type.startsWith('image/') ? (
                            <img src={filePreview!} alt="preview" className="w-full h-64 object-cover rounded-md mb-4" />
                        ) : attachedFile?.type.startsWith('video/') ? (
                            <video src={filePreview!} className="w-full h-64 object-cover rounded-md mb-4" controls />
                        ) : (
                            <div className="text-gray-500 mb-4">{attachedFile?.name}</div>
                        )}
                        {attachedFile?.type.startsWith('image/') && (
                            <button onClick={(e) => handleFileSubmit(e, ContentType.IMAGE)} className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-2">
                                Send Image
                            </button>
                        )}
                        {attachedFile?.type.startsWith('video/') && (
                            <button onClick={(e) => handleFileSubmit(e, ContentType.VIDEO)} className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-2">
                                Send Video
                            </button>
                        )}
                        {!attachedFile?.type.startsWith('image/') && !attachedFile?.type.startsWith('video/') && (
                            <button onClick={(e) => handleFileSubmit(e, ContentType.FILE)} className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-2">
                                Send File
                            </button>
                        )}
                        <button onClick={handleModalClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TutorChatPage;

