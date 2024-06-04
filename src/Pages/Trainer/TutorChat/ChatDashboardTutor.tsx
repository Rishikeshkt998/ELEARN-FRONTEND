// /* eslint-disable @typescript-eslint/no-explicit-any */

// import images from "../../../assets/images (1).png";
// import { RefObject, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import ChatTutor from "@/Components/Trainer/Chat/ChatTutor";
// import TutorMessage from "@/Components/Trainer/Chat/TutorMessage";
// import { Socket, io } from "socket.io-client";
// import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
// interface Conversation {
//     _id: string;
//     // Add other properties if available
// }

// interface MessageData {
//     senderId: string;
//     message: string;
// }
// type SocketRef = RefObject<Socket<DefaultEventsMap, DefaultEventsMap>>;
// const ChatDashboardTutor = () => {

//     const userId = localStorage.getItem('trainerId') as string | null
//     const [conversations, setConversations] = useState<Conversation[]>([])
//     const [currentChat, setCurrentChat] = useState<Conversation | null>(null)
//     const [messages, setMessages] = useState<MessageData[]>([])
//     const [newMessage, setNewMessage] = useState("")
//     const [arrivalMessage, setArrivalMessage] = useState<MessageData | null>(null)
//     const socket:SocketRef= useRef()
//     const scrollRef = useRef<HTMLDivElement>()
//     useEffect(() => {

//         socket.current = io("ws://localhost:5000");
//         socket.current.on("getMessage", data => {
//             console.log("userdata", data)
//             setArrivalMessage({
//                 senderId: data.senderId,
//                 message: data.message,
//                 creationTime: Date.now()
//             })
//             console.log(arrivalMessage)

//         })

//     }, [])
//     useEffect(() => {
//         socket.current.emit("addUser", userId)
//         socket.current.on("getUsers", users => {
//             console.log("users", users)
//         })


//     }, [])
    
//     useEffect(() => {
//         arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) &&
//             setMessages(prev => [...prev, arrivalMessage])
//     }, [arrivalMessage, currentChat])
//     useEffect(() => {

//         const getConversation = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/chat/getConversation/${userId}`)
//                 console.log(response.data.data)
//                 setConversations(response.data.data)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         getConversation()
//     }, [userId])
//     console.log("currentchat", currentChat)
//     useEffect(() => {
//         const getMessages = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/api/chat/getMessages/${currentChat?._id}`)
//                 console.log("message", res.data.data)
//                 setMessages(res.data.data)

//             } catch (err) {
//                 console.log(err)
//             }

//         }
//         getMessages()

//     }, [currentChat])
//     console.log("messages", messages)
//     console.log("userId", userId)
//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         const message = {
//             senderId: userId,
//             message: newMessage,
//             conversationId: currentChat?._id
//         }
//         const recieverId = currentChat?.members.find(member => member !== userId)
//         console.log("recieverId", recieverId)
//         socket.current.emit("sendMessage", {
//             senderId: userId,
//             recieverId,
//             message: newMessage
//         })
//         try {
//             const res = await axios.post("http://localhost:5000/api/chat/newMessage", message)
//             console.log(res)
//             setMessages([...messages, res.data.data])

//         } catch (err) {
//             console.log(err)
//         }
//     }
//     useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behviour: "smooth" })

//     }, [messages])

//     return (
//         <div className="w-screen flex">
//             <div className="w-[25%] border border-black  bg-blue-50">
//                 <div className="flex item-center my-8 mx-14">
//                     <div className="rounded-full border-blue-500">
//                         <img src={images} className="pt-1 rounded-full" width={40} height={30} />
//                     </div>
//                     <div className="ml-4">
//                         <h3 className="text-xl">Tutorials Dev</h3>
//                         <p className="text-sm font-light">My Account</p>
//                     </div>
//                 </div>
//                 <hr />
//                 <div className="mx-14 mt-10">
//                     <div className="text-blue-500 text-lg">Messages</div>
//                     <div>
//                         {
//                             conversations.map((c, index) => (
//                                 <div key={index} onClick={() => setCurrentChat(c)}>
//                                     <ChatTutor conversation={c} currentUser={userId} />
//                                 </div>
//                             ))
//                         }

//                     </div>
//                 </div>
//             </div>
//             <div className="w-[75%] flex flex-col items-center bg-white ">
//                 <div className="w-[75%] bg-blue-50 h-[80px] my-14 rounded-full flex items-center px-14 shadow-md">
//                     <div className="cursor-pointer">
//                         <img src={images} className="pt-1 rounded-full" width={30} height={20} />
//                     </div>
//                     <div className="ml-6 mr-auto">
//                         <h3 className="text-lg">Alexander</h3>
//                         <p className="text-sm font-light text-gray-600">online</p>
//                     </div>
//                     <div className="cursor-pointer">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                             <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
//                             <path d="M15 9l5 -5" />
//                             <path d="M16 4l4 0l0 4" />
//                         </svg>
//                     </div>
//                 </div>
//                 {
//                     currentChat ? (<>
//                         <div className="h-[75%] w-full overflow-scroll overflow-x-hidden shadow" >
                            
//                             {messages.map((m, index) => (
//                                 <div key={index}  ref={scrollRef}>

//                                     <TutorMessage message={m} own={m.senderId === userId} />
//                                 </div>
                                

//                             ))}
                            





//                         </div>
//                         <div className="p-14 w-full flex items-center">
//                             <input placeholder="type a message..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="p-2 border-0 shadow-lg rounded-full bg-blue-50 w-[75%] focus:ring-0 focus:border-0 outline-none"></input>
//                             <div className="ml-4 p-4 cursor-pointer bg-blue-50 rounded-full">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                     <path d="M10 14l11 -11" />
//                                     <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
//                                 </svg>
//                             </div>
//                             <button onClick={handleSubmit}>hi
//                                 {/* <div className="ml-4 p-4 cursor-pointer bg-blue-50 rounded-full">
                                
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                         <path d="M12 5l0 14" />
//                                         <path d="M5 12l14 0" />
//                                     </svg>

//                             </div> */}
//                             </button>

//                         </div>
                        
//                     </>) : (<span>Open a conversation to start a chat</span>)
//                 }

//             </div>
            
//         </div>
//     );
// };

// export default ChatDashboardTutor;