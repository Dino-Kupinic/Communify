import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import cors from "cors"
import {createServer} from "node:http"
import {errorHandler} from "./middleware/error-handler"
import {connectAndQuery} from "./database/db"
import {roomRouter} from "./room/room-controller"
import {clientRouter} from "./client/client-controller"
import {authRouter} from "./auth/auth-controller"
import {topicRouter} from "./topic/topic-controller"
import {messageRouter} from "./message/message-controller"
import {Server, Socket} from "socket.io"
import {Message} from "./models/types"

dotenv.config()

export const port: string | undefined = process.env.PORT
export const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.get("/", (req: Request, res: Response): void => {
  const count = io.engine.clientsCount
  res.send(`Communify Backend ------- current clients: ${count}`)
})

export const server = createServer(app)

const routes = [
  {path: "/room", router: roomRouter},
  {path: "/client", router: clientRouter},
  {path: "/auth", router: authRouter},
  {path: "/topic", router: topicRouter},
  {path: "/message", router: messageRouter},
]

routes.forEach(route => app.use(route.path, route.router))

const FRONTEND_URL = process.env.FRONTEND_URL as string

/**
 * Represents a Server object for handling input and output operations.
 * @class
 * @param {Object} server - The server object to be used for handling IO operations.
 * @param {Object} options - The options object for configuring the server.
 * @param {Object} options.cors - The CORS configuration for the server.
 * @param {string} options.cors.origin - The origin URL allowed for CORS requests.
 */
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: FRONTEND_URL,
  },
})

io.on("connection", (socket: Socket) => {
  console.log("a user connected")
  
  socket.on("joinRoom", (room: string) => {
    socket.join(room)
  })

  socket.on("chatMessage", async (data: Message) => {
    await fetch(`${FRONTEND_URL}/message/createMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    io.to(`room-${data.room_id}`).emit("newMessage", data)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
})


server.listen(port, (): void => {
  console.log(`[server]: Server is running at ${port}`)
  connectAndQuery()
})