import { Socket, io } from "socket.io-client";

let socket: Socket | null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("https://samvada-server-socket.onrender.com", {
      transports: ["websocket"],
    });
  }
  return socket;
};

// import { io } from "socket.io-client";
// const socket = io("http://localhost:3001");
// export default socket;
