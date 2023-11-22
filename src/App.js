import { useMetaMask } from "metamask-react";
import PeerVideo from "./screens/peer-video.jsx";
import Home from "./screens/home";

export default function App() {
  const { status, chainId } = useMetaMask();

  if (status === "initializing")
    return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available :(</div>;

  if (status === "notConnected") return <Home />;

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected") return chainId === "0x5" ? <PeerVideo /> : <Home />;

  return null;
}