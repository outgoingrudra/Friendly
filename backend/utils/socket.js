import { Server } from "socket.io";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
    origin: "https://friendly-frontend-omega.vercel.app",
    credentials: true,
  },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ chatId }) => {
      socket.join(chatId);
    });
  });
}

export function getIO() {
  return io;
}