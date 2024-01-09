import React, { useEffect } from "react";
import Navbar from "./navbar";
import axios from "axios";


export default function Huddle() {

    const userVideo = React.useRef();
    const partnerVideo = React.useRef();
    const [roomId, setRoomId] = React.useState("");
    const [accessToken, setAccessToken] = React.useState();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                userVideo.current.srcObject = currentStream;

            }).catch(error => {
                console.log("Error: ", error);
            });
    }, []);


    return (
        <div className="relative h-screen">
            <div className="absolute inset-x-0 top-0">
                <Navbar />
            </div>
            <div className="absolute inset-0">
                <div className="flex items-center justify-center gap-4 h-full">
                    <video className="w-96 h-72 shadow-lg rounded-2xl saturate-150" ref={userVideo} autoPlay muted playsInline />
                    <video className="w-96 h-72  shadow-lg rounded-2xl saturate-150" ref={userVideo} autoPlay muted playsInline />
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 w-screen text-slate-400 p-5 text-center">
                <h1>@ Develop In BitsBrewLab with ❤️</h1>
            </div>
        </div>
    );
}