//import cosmos from './cosmosRT.js'

import { io } from "socket.io-client";

const socket = io("http://localhost:3500");

const SocketHandler = (io) => {

    io.on("connection", (socket) => {
        // console.log(socket.handshake.url);
        console.log("nuevo socket connectado:", socket.id);

        /*socket.on("COSMOS", (data) => {
            console.log(data.fullDocument)
            io.emit("COSMOS", data)
        });*/

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });

    });

    //cosmos(socket)
}


export default SocketHandler;