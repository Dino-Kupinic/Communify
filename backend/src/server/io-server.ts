import {Server, Socket} from "socket.io"
import {server} from "../index"

const FRONTEND_URL: string = "http://localhost:10000"

/**
 * Represents a Server object for handling input and output operations.
 * @class
 * @param {Object} server - The server object to be used for handling IO operations.
 * @param {Object} options - The options object for configuring the server.
 * @param {Object} options.cors - The CORS configuration for the server.
 * @param {string} options.cors.origin - The origin URL allowed for CORS requests.
 */
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
  },
})

io.on("connection", (socket: Socket) => {
  console.log("a user connected")

  socket.on("joinRoom", (room: string) => {
    socket.join(room)
  })

  socket.on("chatMessage", (data: { room: string; message: string }) => {
    io.to(data.room).emit("message", data.message)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
})

