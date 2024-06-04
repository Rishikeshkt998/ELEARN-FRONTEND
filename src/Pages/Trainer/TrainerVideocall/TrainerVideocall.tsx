/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const TrainerVideocall: React.FC = () => {
    const { roomID } = useParams<{ roomID: string }>();
    const containerRef = useRef<HTMLDivElement>(null);
    const zpRef = useRef<any>();

    useEffect(() => {
        if (roomID) {
            const initializeZego = async () => {
                const appID =import.meta.env.VITE_VIDEOCALL_APPID
                const serverSecret =import.meta.env.VITE_VIDEOCALL_SECRET
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    serverSecret,
                    roomID,
                    Date.now().toString(),
                    "Tutor"
                );
                const zp = ZegoUIKitPrebuilt.create(kitToken);
                zpRef.current = zp;
            };

            initializeZego();
        }
    }, [roomID]);

    useEffect(() => {
        if (roomID && zpRef.current && containerRef.current) {
            zpRef.current.joinRoom({
                container: containerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference,
                },
            });
        }
    }, [roomID]);

    return (
        <div
            className="myCallContainer"
            ref={containerRef}
            style={{ width: '100vw', height: '100vh' }}
        ></div>

    );
};

export default TrainerVideocall;
