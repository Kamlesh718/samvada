import { Socket, io } from "socket.io-client";

let socket: Socket | null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://192.168.0.108:3001", {
      transports: ["websocket"],
    });
  }
  return socket;
};

// import { io } from "socket.io-client";
// const socket = io("http://localhost:3001");
// export default socket;
