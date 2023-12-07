import React, {  useEffect, useRef } from "react";
import Navbar from "./navbar";
import io from 'socket.io-client';

const socket = io(
  '/webRTCPeers',
  {
    path: '/webrtc'
  }
)

export default function PeerVideo() {

  const userVideo = useRef();
  const partnerVideo = useRef();
  const textref = useRef();
  const pc = useRef(new RTCPeerConnection(null));
  const candidates = useRef([]);

  // Access the user's media devices
  useEffect(() => {
    socket.on('connection-success', success => {
      console.log(success);
    })

    socket.on('sdp', data => {
      console.log(data);
      textref.current.value = JSON.stringify(data.sdp)
    })

    socket.on('candidate', data => {
      console.log(data)
      candidates.current = [ ...candidates.current, data]
    })

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        userVideo.current.srcObject = currentStream;
        
        currentStream.getTracks().forEach(track => {
          _pc.addTrack(track, currentStream);
        })
      }).catch(error => {
        console.log("Error: ", error);
      });

    const _pc = new RTCPeerConnection(null);

    _pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate));
        socket.emit('candidate', e.candidate);
      }
    }

    // represent state
    // connection ... disconnection ... failed ... closed
    _pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    }

    _pc.ontrack = (e) => {
      // we gor remot stream...
      partnerVideo.current.srcObject = e.streams[0];
    }

    pc.current = _pc;
  }, []);

  const createConnection = () => {
    pc.current.createOffer({
      offerToReceiveVideo: 1,
      offerToReceiveAudio: 1,
    }).then(sdp => {
      console.log(sdp);
      pc.current.setLocalDescription(sdp);

      // send the sdp to the server
      socket.emit('sdp', {
        sdp,
      })
    }).catch(e => console.log(e));
  }

  const createAnswer = () => {
    pc.current.createAnswer({
      offerToReceiveVideo: 1,
      offerToReceiveAudio: 1,
    }).then(sdp => {
      console.log(sdp);
      pc.current.setLocalDescription(sdp);

      // send answer to the server..
      socket.emit('sdp', {
        sdp
      })
    }).catch(e => console.log(e));
  }

  const setRemoteDec = () => {
    const sdp = JSON.parse(textref.current.value);
    console.log(sdp)

    pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
  }

  const addCandidate = () => {
    // const candidate = JSON.parse(textref.current.value);
    // console.log("Adding Candidate", candidate)

    candidates.current.forEach(candidate => {
      console.log(candidate);
      pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    })

  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto  justify-items-center max-w-screen-xl px-4 py-32 ">
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          <video className="w-96 h-72 m-5 bg-slate-200 shadow-lg rounded-2xl saturate-150" ref={userVideo} autoPlay muted playsInline />
          <video className="w-96 h-72 m-5 bg-slate-200 shadow-lg rounded-2xl saturate-150" ref={partnerVideo} autoPlay playsInline />
        </div>

        <br />
        <button className="bg-black text-white px-5 py-3 m-5 rounded-lg" onClick={createConnection}> Create Connection</button>
        <button className="bg-black text-white px-5 py-3 m-5 rounded-lg" onClick={createAnswer}> Create Answer</button>
        
        <br />
        <textarea ref={textref}></textarea>
        <br />
        <button className="bg-black text-white px-5 py-3 m-5 rounded-lg" onClick={setRemoteDec}> Set Remote</button>
        <button className="bg-black text-white px-5 py-3 m-5 rounded-lg" onClick={addCandidate}> Add Candidates</button>
      </div>
    </div>
  );
}
