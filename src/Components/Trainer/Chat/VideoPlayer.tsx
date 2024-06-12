/* eslint-disable @typescript-eslint/no-explicit-any */
// import { FC } from 'react';
// import ReactPlayer from 'react-player';
// type Props={
//     url:any 
//     onClose:any
// }
// const VideoPlayer:FC<Props> = ({ url, onClose }) => {
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
//                 <h2 className="text-2xl mb-4">Video Preview</h2>
//                 <div className="w-full h-64 mb-4">
//                     <ReactPlayer url={url} controls width="100%" height="100%" />
//                 </div>
//                 <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };
// export default VideoPlayer
import React, { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactPlayer from 'react-player';

type Props = {
    url: string;
    onClose: () => void;
};

const VideoPlayer: FC<Props> = ({ url, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
                <FaTimes
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-700 cursor-pointer text-2xl"
                />
                <h2 className="text-2xl mb-4">Video Preview</h2>
                <div className="w-full h-64 mb-4">
                    <ReactPlayer url={url} controls width="100%" height="100%" />
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;