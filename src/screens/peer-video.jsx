import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import { useMetaMask } from "metamask-react";

export default function PeerVideo() {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  
  const userVideo = useRef();
  const partnerVideo = useRef();

  const { account } = useMetaMask();

  // Access the user's media devices
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      });
  }, []);

  // Function to initiate a call
  const callPeer = () => {
    const newPeer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
  
    newPeer.on("signal", (data) => {
      console.log(`Initiator Signal Data: `, data);
      // Typically, you'd send this data to the other peer via some signaling method
    });
  
    newPeer.on('error', err => {
      console.error('Error with initiator peer', err);
    });
  
    setPeer(newPeer);
  };
  
  const handleSignal = () => {
    const signalingData = document.getElementById("signalingInput").value;
    const parsedData = JSON.parse(signalingData);
  
    const newPeer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
  
    newPeer.signal(parsedData);
  
    newPeer.on("signal", (data) => {
      console.log("Receiver Signal Data: ", data);
      // Typically, you'd send this data back to the initiator
    });
  
    newPeer.on("stream", (partnerStream) => {
      console.log("Received partner stream");
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = partnerStream;
      }
    });
  
    newPeer.on('error', err => {
      console.error('Error with receiver peer', err);
    });
  
    setPeer(newPeer);
  };

  return (
    <div>
      <video ref={userVideo} autoPlay muted playsInline />
      <video ref={partnerVideo} autoPlay playsInline />
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5" onClick={callPeer}>Start Call</button>
      <textarea id="signalingInput" placeholder="Paste signaling data here"></textarea>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignal}>Recive Call</button>
    </div>
  );
}
