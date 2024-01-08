import React, { useEffect } from "react";
import Navbar from "./navbar";
import { sessionData } from "../services/huddleServices";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { useRoom } from '@huddle01/react/hooks';

export default function Huddle() {

    const userVideo = React.useRef();
    const partnerVideo = React.useRef();
    const [roomId, setRoomId] = React.useState("");
    const [accessToken, setAccessToken] = React.useState();

    const { joinRoom, leaveRoom } = useRoom({
        onJoin: () => {
            console.log('Joined the room');
        },
        onLeave: () => {
            console.log('Left the room');
        },
    });


    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                userVideo.current.srcObject = currentStream;

            }).catch(error => {
                console.log("Error: ", error);
            });
        setRoomId(sessionData.data.data.roomId);
        generateToken();
    }, []);




    const generateToken = async () => {

        const accessToken = new AccessToken({
            apiKey: process.env.HUDDLE_API_KEY,
            roomId: roomId,
            role: Role.HOST,
        });

        setAccessToken(accessToken);
    }


    return (

        <div className="relative h-screen">
            <div className="absolute inset-x-0 top-0">
                <Navbar />
            </div>
            <div className="absolute inset-0">
                <div className="flex items-center justify-center gap-4 h-full">
                    <video className="w-96 h-72 shadow-lg rounded-2xl saturate-150" ref={userVideo} autoPlay muted playsInline />
                    <video className="w-96 h-72 bg-slate-200 shadow-lg rounded-2xl saturate-150" ref={partnerVideo} autoPlay muted playsInline />
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 w-screen text-slate-400 p-5 text-center">
                <h1>@ Develop In BitsBrewLab with ❤️</h1>
                <button onClick={() => {
                    joinRoom({
                        roomId: roomId,
                        token: accessToken
                    });
                }}>Join Room</button>
            </div>
        </div>


    );
}