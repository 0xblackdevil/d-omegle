import { ethers } from "ethers";

const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
const walletSigner = await walletProvider.getSigner();

export default walletSigner;