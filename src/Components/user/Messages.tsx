/* eslint-disable @typescript-eslint/no-explicit-any */



import { format } from 'timeago.js';

const Messages = ({ message, own }: { message: any, own: boolean }) => {
    const messageContainerClass = own ? "justify-end" : "justify-start";
    const messageBubbleClass = own ? "bg-indigo-500 text-white" : "bg-white text-gray-700";
    const avatarPositionClass = own ? "ml-2" : "mr-2";
    const timeClass = own ? "text-xs text-gray-500" : "text-xs text-gray-500";

    return (
        <div className={`flex ${messageContainerClass} mb-4 cursor-pointer`}>
            {!own && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center">
                    <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="Other Avatar" className="w-8 h-8 rounded-full" />
                </div>
            )}
            <div>
                <div className={`flex  max-w-96 rounded-lg p-3 gap-3 ${messageBubbleClass}`}>
                    <p>{message.message}</p>
                    

                </div>
                <span className={`flex-grow ${timeClass}`}>{format(message.creationTime)}</span>
            </div>
            
            
            {own && (
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${avatarPositionClass}`}>
                    <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                </div>
            )}
        </div>
    );
};

export default Messages;