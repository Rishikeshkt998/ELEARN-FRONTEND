/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useRef, useState } from "react";
import io, { Socket } from 'socket.io-client'
import Chatuserss from "@/Components/user/Chatuserss";
import Messages from "@/Components/user/Messages";
import ScrollbleFeed from "react-scrollable-feed"
import { ChatWithTutor, FilePostTutor, GetMessagesForUser, MessagePostUser,} from "@/Api/user";
import { FaFile, FaImage, FaPaperclip, FaVideo } from "react-icons/fa";
import { UploadS3Bucket } from "@/Services/S3bucket";
import InputEmoji from "react-input-emoji";
import { useNavigate } from "react-router-dom";

interface MessageData {
    senderId: string;
    message: string;
    contentType: any;
    creationTime: any;
    status: 'read' | 'unread';
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

enum ContentType {
    VIDEO = 'video',
    IMAGE = 'image',
    FILE = 'file',
    TEXT = 'text'
}
const Chatpage: React.FC = () => {
    const userId = localStorage.getItem('userId') as string | null
    const [conversations, setConversations] = useState<any>([])
    const [currentChat, setCurrentChat] = useState<any>(null)
    const [messages, setMessages] = useState<MessageData[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState<MessageData | null>(null)
    const [user, setUser] = useState<Trainer[] | null>([])
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [fileurl, setFileUrl] = useState("")
    const [dummyState, setDummyState] = useState(false);
    const [tutorInfo, settutorInfo] = useState<any>();
    const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: number }>({});
    // const [lastClickedUser, setLastClickedUser] = useState<string | null>(null);
    const socket: MutableRefObject<Socket | undefined> = useRef()
    useEffect(() => {
        console.log("vite", import.meta.env.VITE_SOCKETIO_URL)
        socket.current = io(import.meta.env.VITE_SOCKETIO_URL)
        socket.current?.on("getMessage", (data: any) => {
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
    // useEffect(() => {
    //     if (arrivalMessage && currentChat && currentChat[0].members.includes(arrivalMessage.senderId)) {
    //         setMessages(prev => [...prev, arrivalMessage]);

    //     }
    // }, [arrivalMessage, currentChat]);
    useEffect(() => {
        arrivalMessage && currentChat && currentChat[0]?.members.includes(arrivalMessage.senderId) &&
        setMessages(prev => [...prev, arrivalMessage])
        setUnreadMessages(prev => ({
            ...prev,
            [arrivalMessage?.senderId as string]: (prev[arrivalMessage?.senderId as string] || 0) + 1
        }));

        console.log("hiiii", unreadMessages)


        console.log("Updated unreadMessages state:", unreadMessages);

    }, [arrivalMessage])
    useEffect(() => {
        console.log("Unread Messages: ", unreadMessages);
    }, [unreadMessages]);


    useEffect(() => {
        if (currentChat) {
            setUnreadMessages(prev => {
                const updatedUnreadMessages = { ...prev };
                const senderId = currentChat[0]?.members.find((member: any) => member !== userId);
                if (senderId) {
                    delete updatedUnreadMessages[senderId];
                }

                return updatedUnreadMessages;
            });
        }
    }, [currentChat, userId]);
    useEffect(() => {
        const getUser = async () => {
            try {

                const response = await ChatWithTutor(userId)
                console.log("tutors", response?.data.findedtrainer)

                if (response && response.data.findedtrainer) {
                    console.log("data", response.data.findedtrainer)
                    setUser(response.data.findedtrainer);


                    // await Promise.all(response.data.findedtrainer.map(async (trainer: any) => {
                    //     const tutorid = trainer.id;
                    //     console.log("id", tutorid);
                    //     const newConversationResponse = await NewConversationWithTutor(userId, tutorid)

                    //     console.log("new", newConversationResponse);

                    // }));

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

                    setMessages(res?.data.data)

                }




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
    console.log(dummyState)
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
            console.log(res)
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
            console.log(contentType)
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
            const res = await FilePostTutor(message);
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
    const navigate = useNavigate(); 
    const handleClick = () => {
        navigate(-1);
    };
    return (
        
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/4 bg-white border-r hidden md:block border-gray-300">
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                    <h1 className="text-2xl font-semibold">ELEARN</h1>
                    <div className="relative">
                        <button id="menuButton" className="focus:outline-none" onClick={handleClick}></button>
                    </div>
                </header>
                <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                    <div>
                        <Chatuserss conversations={conversations} setConversations={setConversations}  currentChat={currentChat} setCurrentChat={setCurrentChat} currentUser={userId} user={user} setUser={setUser} unreadMessages={unreadMessages} tutorInfo={tutorInfo} settutorInfo={settutorInfo}/>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                {currentChat ? (
                    <>
                        <header className="bg-white p-4 text-gray-700">
                            <h1 className="text-2xl font-semibold">{tutorInfo.name}</h1>
                        </header>
                        <div className="h-full overflow-y-auto bg-gray-100 pb-36">
                            <ScrollbleFeed>
                                {messages && messages.length === 0 ? (
                                    <div className="text-center">Start a conversation</div>
                                ) : (
                                    messages.map((m, index) => (
                                        <Messages key={index}  message={m} own={m.senderId === userId} />
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
            {loading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
                </div>
            )}
        </div>
    );
};

export default Chatpage;




