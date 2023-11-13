import { PushAPI } from "@pushprotocol/restapi";
import walletSigner from "../services/signer.jsx";

const userAlice = await PushAPI.initialize(walletSigner, { env: "staging" });
const pushProfile = await userAlice.info();

export default pushProfile;