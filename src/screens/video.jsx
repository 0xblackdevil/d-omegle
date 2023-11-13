import {
  PushAPI,
  VideoCallData,
  video,
  VideoCallStatus,
} from "@pushprotocol/restapi";
import { Video, initVideoCallData } from "@pushprotocol/restapi/src/lib/video";

import React, { useEffect, useRef, useState } from "react";
import walletSigner from "../services/signer.jsx";
import { ENV } from "@pushprotocol/restapi/src/lib/constants.js";

export default function VideoScreen() {

  const env = ENV.STAGING;
  // const [data, setData] = useState<PushAPI.videoCallData>(null);

  const pushInit = async () => {
    const userAlice = await PushAPI.initialize(walletSigner, {
      env: "staging",
    });
    const pushProfile = await userAlice.info();

    const signer = walletSigner;
    const chainId = 5;
    const pgpPrivateKey = pushProfile.encryptedPrivateKey;
    const env = "staging";
    const videoCallData = PushAPI.videoCallData;

    const videoInstance = new Video({
      signer: signer,
      chainId: chainId,
      pgpPrivateKey: pgpPrivateKey,
      setData: (fn) => {
        fn((data) => ({
          ...data,
          meta: { ...data.meta, chatId: chainId },
        }));
      },
      // Other options...
    });

    console.log(userAlice);

    videoInstance.create(/* options */);

    videoInstance.request({
      senderAddress: signer.address,
      recipientAddress: "0xb7Ce9a6ff1cB548383d2AA4202E763e6C529928a", // see supported wallet standards - https://push.org/docs/video/supported-wallet-standards
      chatId: chainId,
    });

    console.log(videoInstance);

    // userAlice.chat.decrypt
    // const videoCallData = new PushAPI.videoCallData();
    // const videoCallData = new Video({
    //   signer,
    //   chainId,
    //   pgpPrivateKey,
    //   env,
    //   initVideoCallData,
    // });

    // console.log(videoCallData);

    // const videoCallData = await initVideoCallData({
    //   signer: walletSigner,
    //   chainId: 0xaa36a7,
    //   pgpPrivateKey: pushProfile.encryptedPrivateKey,

    // });
  };

  useEffect(() => {
    // pushInit();
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
    </div>
  );
}
