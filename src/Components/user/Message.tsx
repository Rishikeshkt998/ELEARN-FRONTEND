import { format } from 'timeago.js';

const Message = ({ message, own }) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className={own ? "max-w-[40%] bg-blue-500 rounded-b-xl rounded-tr-xl p-4 text-white mb-6 ml-auto" : "max-w-[40%] bg-blue-50 rounded-b-xl rounded-tr-xl p-4"}>
                {message.message}
            </div>
            <div className={own ? "text-right" : "text-left"}>
                <span className="text-sm">{format(message.creationTime)}</span>
            </div>
        </div>
    );
}

export default Message;
