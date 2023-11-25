import { io } from "socket.io-client";
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
// const URL = "https://react-on-chatter-6ef12e3df9fb.herokuapp.com/";

export const socket = io(URL, {
    autoConnect: false
});


