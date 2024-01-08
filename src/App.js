import { useMetaMask } from "metamask-react";
// import PeerVideo from "./screens/peer-video.jsx";
import Home from "./screens/home";
import { useState } from "react";
import Huddle from "./screens/huddle.jsx";

export default function App() {
  const { status, chainId } = useMetaMask();
  const [stacked, isStacked] = useState("false");

  if (status === "initializing")
    return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available :(</div>;

  if (status === "notConnected") return <Home />;

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected") return chainId === "0xaa36a7" ? <Huddle /> : <Home stackValue={stacked} setStack={isStacked} />;

  return null;
}