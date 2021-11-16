import program from "./streams.js";

import { io } from "socket.io-client";

const socket = io("http://localhost:3500");

const SocketHandler = (io) => {

    io.on("connection", (socket) => {
        // console.log(socket.handshake.url);
        console.log("nuevo socket connectado:", socket.id);

        socket.on("squidgame", (data) => {
            //console.log(data.fullDocument)
            io.emit("squidgame:front", data)
        });

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });

    });

    program(socket)
}


export default SocketHandler;