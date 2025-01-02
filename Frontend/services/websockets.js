import io from "socket.io-client";
import { IP_ADDRESS_SERVER } from "@env";

const socket = io(`http://${IP_ADDRESS_SERVER}:5000`);

export default socket