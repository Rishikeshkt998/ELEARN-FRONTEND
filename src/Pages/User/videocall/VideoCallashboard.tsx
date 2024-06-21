/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */


import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { GetVideoCall } from "@/Api/user";


const VideoCallashboard: React.FC = () => {
    const [appID, setAppID] = useState<number | null>(null);
    const [serverSecret, setServerSecret] = useState<string | null>(null);
    const { roomID } = useParams<{ roomID: string }>();
    const containerRef = useRef<HTMLDivElement>(null);
    const zpRef = useRef<any>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const navigate = useNavigate();

    const getCredentials = async () => {
        const response = await GetVideoCall()
        if (response?.data && response?.data.appID !== undefined) {
            const id = Number(response?.data.appID);
            setAppID(id)
            setServerSecret(response.data.serverSecret);
        }else{
            navigate("/");

        }
        
    };

    useEffect(() => {
        getCredentials();
    }, []);

    const handleStartCall = () => {
        if (roomID && appID !== null && serverSecret !== null) {
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                Date.now().toString(),
                "Arun"
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zpRef.current = zp;

            if (zpRef.current && containerRef.current) {
                zpRef.current.joinRoom({
                    container: containerRef.current,
                    scenario: {
                        mode: ZegoUIKitPrebuilt.VideoConference,
                    },
                });
            }

            setIsInitialized(true);
        }
    };

    return (
        <div className="">
            {!isInitialized && (
                <button
                    onClick={handleStartCall}
                    className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors mt-16"
                >
                    Enter Class
                </button>
            )}
            <div
                ref={containerRef}
                className="myCallContainer"
                style={{ width: '100vw', height: '100vh' }}
            />
        </div>
    );
};

export default VideoCallashboard;
