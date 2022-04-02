import io from "socket.io-client";

let socket = io("//localhost:5001");

export default socket;
