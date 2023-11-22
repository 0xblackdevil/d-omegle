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

    newPeer.on("signal", async  (data) => {
      console.log(`sender ${account} data: `, data);
    });

    setPeer(newPeer);
  };

  // Function to handle the incoming signal data
  const handleSignal = (signalData) => {
    const newPeer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    newPeer.signal(signalData);

    newPeer.on("signal", (data) => {
      console.log("receiver data: ", data);
    });

    newPeer.on("stream", (partnerStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = partnerStream;
      }
    });

    setPeer(newPeer);
  };

  return (
    <div>
      <video ref={userVideo} autoPlay muted playsInline />
      <video ref={partnerVideo} autoPlay playsInline />
      <button onClick={callPeer}>Start Call</button>
      {/* Implement input or mechanism to receive and handle signal data */}
    </div>
  );
}
