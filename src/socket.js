import { io } from "socket.io-client";
const URL = process.env.NODE_ENV === 'production' ? "https://onchat-server.vercel.app" : 'http://localhost:5000';
// const URL = "https://onchat-server.vercel.app";

export const socket = io(URL, {
    autoConnect: false
});


