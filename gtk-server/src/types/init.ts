import { Server } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./socketEvents";

// Make sure to import or create your HTTP server instance before this line
import { createServer } from "http";
const httpServer = createServer();

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
