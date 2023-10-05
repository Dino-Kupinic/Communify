import {Server} from "socket.io"
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "../models/socket-io"
import {server} from "../index"

const FRONTEND_URL: string = "http://localhost:10000"

/**
 * Represents an instance of a socket io server.
 *
 * @template ClientToServerEvents - The type of events sent from the client to the server.
 * @template ServerToClientEvents - The type of events sent from the server to the client.
 * @template InterServerEvents - The type of events exchanged between servers.
 * @template SocketData - The type of data transmitted over sockets.
 */
const io: Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
  },
})


io.on("connection", (socket) => {
  console.log("a user connected")
})