import io from "socket.io-client";

let socket = null;

export const createSocketConnection = () => {
  if (!socket || socket.disconnected) {
    socket = io(import.meta.env.VITE_API_URL);
  }
  return socket;
};