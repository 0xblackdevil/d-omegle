import {
  PushAPI,
  VideoCallData,
  video,
  VideoCallStatus,
} from "@pushprotocol/restapi";
import { Video, initVideoCallData } from "@pushprotocol/restapi/src/lib/video";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import walletSigner from "../services/signer.jsx";
import { ENV } from "@pushprotocol/restapi/src/lib/constants.js";

export default function VideoScreen() {
  const { account } = useMetaMask();
  const [num, setNum] = useState(0);

  const [videoInstance, setVideoInstance] = useState(null);
  const [userAlice, setUserAlice] = useState(null);

  const initVideoCallData = {
    meta: {
      chatId: "",
      initiator: {
        address: "",
        signal: null,
      },
    },
    local: {
      stream: null,
      audio: null,
      video: null,
      address: "",
    },
    incoming: [
      {
        stream: null,
        audio: null,
        video: null,
        address: "",
        status: VideoCallStatus.UNINITIALIZED, // call is at the UNINITIALIZED status
        retryCount: 0,
      },
    ],
  };

  const pushInit = async () => {
    setUserAlice(
      await PushAPI.initialize(walletSigner, {
        env: ENV.STAGING,
      })
    );
    const pushProfile = await userAlice.info();

    const signer = walletSigner;
    const chainId = 5;
    const pgpPrivateKey = pushProfile.encryptedPrivateKey;

    setVideoInstance(
      new Video({
        signer: signer,
        chainId: chainId,
        pgpPrivateKey: pgpPrivateKey,
        setData: () => Video.initVideoCallData,
      })
    );

    console.log(userAlice);
    console.log(videoInstance.data);

    await videoInstance.create({
      video: true,
      audio: true,
      stream: userAlice.stream,
    });
  };

  const callRequest = async () => {
    const requestResponse = await videoInstance.request({
      senderAddress: account,
      recipientAddress: "0xb7Ce9a6ff1cB548383d2AA4202E763e6C529928a", // see supported wallet standards - https://push.org/docs/video/supported-wallet-standards
      chatId: "",
      onReceiveMessage: () => "from domagle",
      retry: false,
    });

    console.log(requestResponse);
  };

  const matchPair = async (max, min) => {
    const user2 = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(user2);
    return user2;
  };

  useEffect(() => {
    pushInit();
    setNum(matchPair(0, 5));
  }, []);

  return (
    <div className="h-screen w-full relative">
      {/* <Webcam
        className=" absolute top-5 right-5 w-48 rounded-xl "
        mirrored={true}
        audio={false}
        videoConstraints={videoConstraints}
      /> */}

      <h1>Video Streaming</h1>

      <button type="button" onClick={callRequest}> start call</button>
    </div>
  );
}
