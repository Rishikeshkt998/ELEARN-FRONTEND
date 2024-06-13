/* eslint-disable @typescript-eslint/no-explicit-any */



import { format } from 'timeago.js';
import ReactPlayer from 'react-player';
import { FaCheckCircle, FaCircle, FaPlayCircle } from 'react-icons/fa';
import { useState } from 'react';
import FileDownload from '../Trainer/Chat/FileDownload';
import VideoPlayer from '../Trainer/Chat/VideoPlayer';

const Messages = ({ message, own }: { message: any, own: boolean }) => {
    const messageContainerClass = own ? "justify-end" : "justify-start";
    const messageBubbleClass = own ? "bg-indigo-500 text-white" : "bg-white text-gray-700";
    const avatarPositionClass = own ? "ml-2" : "mr-2";
    const timeClass = own ? "text-xs text-gray-500" : "text-xs text-gray-500";
    const messagestatusClass = own ? "block" : "hidden";
    const [showVideo, setShowVideo] = useState(false);

    const handleVideoClick = () => {
        setShowVideo(!showVideo);
    };

    const renderMessageContent = () => {
        if (message?.contentType === 'text') {
            return <p>{message?.message}</p>;
        } else if (message?.contentType === 'video') {
            return (

                <div className="relative cursor-pointer" onClick={handleVideoClick}>
                    <FaPlayCircle className="absolute inset-0 m-auto text-white opacity-75 text-6xl" style={{ top: '40%', left: '20%', transform: 'translate(-50%, -50%)' }} />
                    <ReactPlayer url={message?.message}
                        playing={false}
                        width="100%"
                        height="100%"
                        controls={false}

                    />
                </div>
            );
        } else if (message?.contentType === 'image') {
            return <img src={message?.message} alt="Image" className="max-w-full h-auto" />;
        } else if (message?.contentType === 'file') {
            return (
                <FileDownload url={message?.message} />
            );
        } else {
            return <p>{message?.message}</p>;
        }
    };
    // const markMessageAsRead = async (messageId: string) => {
    //     try {
    //         const response = await MessageRead(messageId);
    //        console.log("messageread",response)
    //     } catch (error) {
    //         console.error('Error marking message as read:', error);
    //     }
    // };
    // console.log(message)
    // useEffect(() => {
        
    //     // message?.map((messages:any) => {
    //     //     if (messages?.status === 'unread' && !own) {
    //     //         markMessageAsRead(message?._id);
    //     //     }
    //     // });
    //     if (Array.isArray(message)) {
    //         message.forEach((msg: any) => {
    //             if (msg?.status === 'unread' && !own) {
    //                 console.log(msg)
    //                 markMessageAsRead(msg?._id);
    //             }
    //         });
    //     }
    // }, [message,own]);
    return (
        <div className={`flex ${messageContainerClass} mb-4 cursor-pointer`}>
            {!own && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center">
                    <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="Other Avatar" className="w-8 h-8 rounded-full" />
                </div>
            )}
            <div>
                <div className={`flex  max-w-96 rounded-lg p-3 gap-3 ${messageBubbleClass}`}>
                    {renderMessageContent()}
                    

                </div>
                <span className={`flex-grow ${timeClass}`}>{format(message.creationTime)}</span>
            </div>
            <div className={`flex justify-end ${messagestatusClass}`}>
                {message?.status === 'read' ? <FaCheckCircle /> : <FaCircle />}
            </div>
            
            
            {own && (
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${avatarPositionClass}`}>
                    <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                </div>
            )}
            {showVideo && <VideoPlayer url={message?.message} onClose={() => setShowVideo(false)} />}
        </div>
    );
};

export default Messages;